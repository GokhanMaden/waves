const { auth } = require('../authentication/auth')
const { admin } = require('../authentication/admin')
const { User } = require('./user');
const formidable = require('express-formidable');

function user (app) {
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

  app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      })
    }, {
      public_id: `${Date.now()}`,
      resource_type: 'auto'
    })
  })
  
  app.get(`/api/users/removeimage`,auth, admin, (req, res) => {
    let image_id = req.query.public_id;
  
    cloudinary.uploader.destroy(image_id, (error, result) => {
      if(error) {
        return res.json({success: false, error})
      }
  
      return res.status(200).send({
        success: true
      })
      
    })
  
  })
}

module.exports = user;