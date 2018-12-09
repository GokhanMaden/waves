//Auth burada bize middleware olacaktır.
const { User } = require('../user/user');

let auth = (req, res, next) => {

  //token'a ulaşıyoruz.
  //Parametrede next geçtik. Bu next bize auth'un 
  //görevini yaptıktan sonra sıradaki satıra geçmesini sağlayacak.
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if(err) {
      throw err;
    }

    if(!user) {
      return res.json({
        isAuth: false,
        error: true
      })
    }

    req.token = token;
    req.user = user;

    next();
  })
}

module.exports = {auth}