// const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { User } = require('../db');

router.get('/me', (req, res, next) => {
  res.sendStatus(201)
})

router.get('/artist/:id', async (req, res, next) => {
  try {
    if(isNaN(Number(req.params.id))) {
      return res.sendStatus(404);
    }
    const artist = await User.findByPk(req.params.id)
    return res.send(artist)

  } catch(err) {
    next(err)
  }

})

router.get('/login', async (req, res, next) =>  {
  try {
    console.log({ req })
    if(!req.user || isNaN(Number(req.user.id))) {
      return res.status(401).send('Wrong username and/or password');
    } else {
      let user = await User.findByPk(req.user.id)
      return res.send(user)
    }
  } catch(err) {
    next(err)
  }
})

module.exports = router;
