const router = require('express').Router()
const { get } = require('lodash')
const { Post, User } = require('../db')
//middleware to protect the route for launch
const isAdmin = require('./admin')
const {
  findAllPublic,
  findOnePublic,
  findAllPatron,
  findOnePatron,
} = require('./postPermission')
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
  let post = await findAllPatron(req.user.id, artwork)
    return res.send(post)

  } catch(err) {
      next(err)
    }
})

router.get('/:artistId', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: {
        userId: get(req, 'params.artistId')
      }
    });
    return res.send(posts)

  } catch(err) {
      next(err)
    }
})

router.get('/:artistId/:postId', async (req, res, next) => {
  try {
    console.log('do i get here');
    const artwork = await Post.findOne({
      where: {
        id: req.params.postId
      },
      include: User
    })
    console.log({ artwork });

    if(!req.user || isNaN(Number(req.user.id))) {
      let post = await findOnePublic(artwork)
      return res.send(post)
    }
    let post = await findOnePatron(req.user.id, artwork)
    return res.send(post)

  } catch(err) {
    next(err)
  }
})
