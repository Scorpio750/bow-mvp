const router = require('express').Router()
const { Post, User } = require('../db')
//middleware to protect the route for launch
const isAdmin = require('./admin')
const { findAllPublic, findOnePublic, findAllUser, findOneUser } = require('./postPermission')
module.exports = router

// Get (/api/post/)
router.get('/', async (req, res, next) => {
try {
  //if you haven't been authenticated and logged in
  const artwork = await Post.findAll({include: User})

  if(!req.user || isNaN(Number(req.user.id))) {
    let post = await findAllPublic(artwork)
    return res.send(post)
  }
  //logged in users
  let post = await findAllUser(req.user.id, artwork)
    return res.send(post)

  } catch(err) {
      next(err)
    }
})

router.get('/:postId', async (req, res, next) => {
  try {
    const artwork = await Post.findOne({
      where: {
        id: req.params.postId
      },
      include: User
    })

    if(!req.user || isNaN(Number(req.user.id))) {
      let post = await findOnePublic(artwork)
      return res.send(post)
    }
    let post = await findOneUser(req.user.id, artwork)
    return res.send(post)

  } catch(err) {
    next(err)
  }

  })