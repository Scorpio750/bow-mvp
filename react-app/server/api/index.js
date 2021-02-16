const router = require('express').Router();
module.exports = router;

console.log('here')
router.use('/user', require('./user'))
