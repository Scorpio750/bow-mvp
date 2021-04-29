const passport = require('passport')
const router = require('express').Router()
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db')

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

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/api/user/login' }), (err, req, res, next) => {
  if (err) next(err);
  //else it does work
});

router.post('/signup', async (req, res, next) => {
  try {
    const newestUser = await User.findAll({
      attributes: ['id'],
      limit: 1,
      order: [[ 'id', 'DESC']],
    })
    const newId = ++newestUser[0].dataValues.id;
    let { username, email, password, pronouns, city, region, country } = req.body
    const user = await User.create({id: newId, username, email, password, pronouns, city, region, country})
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {

      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})



router.get('/me', (req, res) => {
  res.json(req.user)
})

module.exports = router
