const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { User } = require('../db');

router.get('/me', (req, res, next) => {
  console.log(req.user, 'hello? ')
  res.sendStatus(201)
})
router.get('/login', async (req, res, next) =>  {
  try {
    let user = await User.findByPk(req.user.id)
    res.send(user)
  } catch(err) {
    next(err)
  }
})


module.exports = router;
