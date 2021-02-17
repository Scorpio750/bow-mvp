//Attempt 2
const passport = require('passport')
const router = require('express').Router()
// tried with just jwt
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} = require('../db')



const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_SECRET,
  algorithms: ['RS256'],

};


passport.use(new JwtStrategy(options, async function(jwt_payload, done) {

  // We will assign the `sub` property on the JWT to the database ID of user
  await User.findOne({id: jwt_payload.sub}, function(err, user) {

      // This flow look familiar?  It is the same as when we implemented
      // the `passport-local` strategy
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }

  });

}));


module.exports = router
