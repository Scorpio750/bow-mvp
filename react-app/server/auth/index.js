const passport = require('passport')
const router = require('express').Router()
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../db')

const strategy = new LocalStrategy(
  async (username, password, cb) => {
    try {
     const user = await User.findOne({ where: { username: username }})
     if (!user) { return cb(null, false) }
     else if(user.correctPassword(password)) return cb(null, user);
     else return cb(null, false);
   }
    catch(err) {
      cb(err)
    }

})

passport.use(strategy);

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: 'api/user/login' }), (err, req, res, next) => {
  if (err) next(err);
  //else it does work
});

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
