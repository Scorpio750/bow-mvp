// const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { User } = require('../db');

router.get('/me', (req, res, next) => {
  res.sendStatus(201)
})

router.get('/login', async (req, res, next) =>  {
  try {
    console.log('hi user login', req.params, 'req user', req.user )
    let user = await User.findByPk(req.user.id)
    return res.send(user)

  } catch(err) {
    next(err)
  }
})


module.exports = router;
