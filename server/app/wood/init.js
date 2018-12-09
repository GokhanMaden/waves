const { auth } = require('../authentication/auth')
const { admin } = require('../authentication/admin')

const {Wood} =require('./wood')

function wood (app) {
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
}

module.exports = wood;