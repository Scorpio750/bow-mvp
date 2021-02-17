//Attempt 1: Difficulty making this work
const passport = require('passport')
const router = require('express').Router()
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const jwt = require('jsonwebtoken');
//maybe I am missing the User model?

passport.use(new JwtCookieComboStrategy({
  secretOrPublicKey: process.env.PASSPORT_SECRET
  // jwtVerifyOptions: {
  //   expiresIn: '1h',
  // },
  // passReqToCallback: false
}, (payload, done) => {
  return done(null, payload.user);
}));

router.post('/login', passport.authenticate('local'), (req, res) => {
  jwt.sign({ user: req.user }, process.env.PASSPORT_SECRET, (err, token) => {
      if (err) return res.json(err);

      // Send Set-Cookie header
      res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
          signed: true,
          secure: true
      });

      // Return json web token
      return res.json({
          jwt: token
      });
  });
});

module.exports = router
