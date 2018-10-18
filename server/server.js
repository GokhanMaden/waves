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

//13:55