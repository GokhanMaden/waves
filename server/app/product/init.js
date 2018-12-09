const { auth } = require('../authentication/auth')
const { admin } = require('../authentication/admin')

const { Product } =require('./product');

function product (app) {
  app.get('/api/product/articles', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  
    Product.find()
    .populate('brand')
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
  
  //{{url}}/api/product/article_by_id?id=5b2d38217d75e2cdcb31cf05&type=single
  app.get('/api/product/article_by_id',(req, res) => {
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
    let skip = parseInt(req.body.skip);
    let findArgs = {};
  
    for(let key in req.body.filters) {
      if(req.body.filters[key].length > 0) {
        if(key === 'price') {
  
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1]
          }
        } else {
          findArgs[key] = req.body.filters[key]
        }
      }
    }
  
    Product
      .find(findArgs)
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, articles) => {
        if(err) {
          return res.status(400).send(err);
        }
        
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
}

module.exports = product;