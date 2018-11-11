const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE);

//bodyParser burada bir middlewaredir.
//Mesela 31. satırdaki req.body'i convert edip bize çözümlenmiş 
//şekilde sunması onu tam bir middleware yapar.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Models
const {User} = require('./models/user');
const {Brand} = require('./models/brand');
const {Wood} = require('./models/wood');
const {Product} = require('./models/product');

//Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//Brand
app.post('/api/product/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if(err) {
      return res.json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      brand: doc
    })
  })
})

app.get('/api/product/brand', (req, res) => {
  Brand.find({}, (err, brands) => {
    if(err) {
      return res.status(400).send(err);
    }
    res.status(200).send(brands)
  })
})

//Woods
app.post('/api/product/wood', auth, admin, (req, res) => {
  const wood = new Wood(req.body);

  wood.save((err, doc) => {
    if(err) {
      return res.json({
        success: false
      })
    }
    res.status(200).json({
      success: true,
      wood: doc
    })
  })
});

app.get('/api/product/woods', (req, res) => {
  Wood.find({}, (err, woods) => {
    if(err) {
      return res.status(400).send(err);
    }

    res.status(200).send(woods);
  })
})

//Product

//By Arrival
// /articles?sortBy=createdAt&order=desc&limit=4


//By Sell
// /article?sortBy=sold&order=desc&limit=4&skip=5
app.get('/api/product/articles', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
  .populate('brands')
  .populate('wood')
  .sort([[sortBy, order]])
  .limit(limit)
  .exec((err, article) => {
    if(err) {
      return res.status(400).send(err);
    }

    res.status(200).send(article)
  })

})
app.get('/api/product/article/article_by_id',(req, res) => {
  //URL'den gelen type parametresini alıyoruz. bunu almamızı sağlayan şey
  // bodyPArser'ın urlencoded kısmı.
  let type = req.query.type;
  let items = req.query.id;

  if(type === "array") {
    let ids =req.query.id.split(',');
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item)
    })
  }

  Product.find({'_id': {$in: items}})
  .populate('brand')
  .populate('wood')
  .exec((err, docs) => {
    return res.status(200).send(docs)
  })
})

app.post('/api/product/article',auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if(err) {
      return res.json({
        success: false,
        err
      })
    }

    res.status(200).json({
      success: true,
      article: doc
    })
  })
})

app.get('/api/product/articles', (req, res) => {
  Product.find({}, (err, articles) => {
    if(err) {
      return res.status(400).send(err);
    }

    res.status(200).send(articles)
  })
})

app.post('/api/product/shop', (req, res) => {

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? req.body.limit : 100;
  let skip = req.body.skip;
  let findArgs = {};

  for(let key in req.body.filters) {
    if(req.body.filters[key].length > 0) {
      if(key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
        console.log("bu fiyat içinden dönen",findArgs)
      } else {
        findArgs[key] = req.body.filters[key]
        console.log("bu sadece brand verdiğimizde dönen",findArgs);
      }
    }
  }

  Product.find(findArgs)
    .populate('brands')
    .populate('woods')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if(err) {
        return res.status(400).send(err);
      }

      // console.log("articles.data",articles)
      
      res.status(200).json({
        size: articles.length,
        articles
      })
    })

    //exec bize serverdan bişeyler dönecek.
    //gte ve lte => greater than and equal to & 
    //less than and equal to anlamında ve görevinde kullanıldı.
    //Product modelini kullanarak tüm parametrelerimizi geçtik.

})

//Users
app.get('/api/users/auth', auth, (req, res) => {
  //buradaki req'in içinde şu an token ve user datası var
  //bunların hepsini auth ile yaptık.

  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  })
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((error, doc) => {
    if(error) {
      return res.json({success: false, error})
    }

    res.status(200).json({
      success: true
    })
  });
})

app.post('/api/users/login', (req, res) => {

  //find email
  //check password
  //generate a token

  User.findOne({'email': req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found!'
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({
          loginSuccess: false,
          message: 'Wrong password'
        })
      }

      user.generateToken((err, user) => {
        if(err) {
          return res.status(400).send(err);
        }

        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true
        })
      })
    });
  })
})

app.get('/api/users/logout', auth, (req, res) => {

  User.findOneAndUpdate(
    { _id: req.user._id},
    { token: ''},
    (err, doc) => {
      if(err) {
        return res.json({success: false, err});
      }

      return res.status(200).send({
        success: true
      })
    }
  )
})

//Müsait olan portlarda koştur.
const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server running on Port ${port}`)
});