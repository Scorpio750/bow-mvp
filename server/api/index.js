const router = require('express').Router();
module.exports = router;
// '/api'
router.use('/user', require('./user'))
router.use('/post', require('./post'))
