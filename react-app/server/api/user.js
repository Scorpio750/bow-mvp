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
// const genToken = user => {
//   return jwt.sign({
//     iss: 'BoW',
//     sub: user.id,
//     iat: new Date().getTime(),
//     exp: new Date().setDate(new Date().getDate() + 1)
//   }, 'Bow');
// }

//tried with traditional JWT model Need to figure out how to connect the user to the token
// router.post('/singup', async function (req, res, next) {
//   const { username, password } = req.body;

//   //Check If User Exists
//   let foundUser = await User.findOne({ username });
//   if (foundUser) {
//     return res.status(403).json({ error: 'Username is already in use'});
//   }

//   const newUser = await User.create({ username, password})
//   // Generate JWT token
//   const token = genToken(newUser)
//   res.status(200).json({token})
// });


//original JWT strategy.
// let refreshTokens = [];

// router.post('/login', async (req, res, next) => {
//   //Authenticate user
//   // send user name and password, + send back a token
//   try{
//   const {username, password } = req.body;
//   const user = await User.findOne({where: {username}})
//   if (!user) {
//     res.status(401).send('Wrong username and/or password')
//   } else if (!user.correctPassword(password)) {
//     res.status(401).send('Wrong username and/or password')
//   }

//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//   await User.post({refreshToken})
//   refreshTokens.push(refreshToken)
//   res.json({ accessToken: accessToken})
//   } catch(err) {
//     next(err)
//   }
// })

// router.post('/token', (req, res) => {
//   const refreshToken = req.body.token;
//   if(refreshToken == null) return res.sendStatus(401)
//   if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if(err) return res.sendStatus(403)
//     const accessToken = generateAccessToken({ name: user.name})
//     res.json(accessToken)
//   })

// })

// router.delete('/logout', (req, res, next) => {
//   refreshTokens = refreshTokens.filter(token  => token !== req.body.token)
//   res.send(204)
// })

//authentication middleware
// function authenticateToken(req, res, next) {
//   //how do I get the token attached to the: attach it to the header on the front end
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]
//   //no token found so unauthorized
//   if(token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     //unverified
//     if(err) return res.sendStatus(403);
//     req.user = user
//     next()
//   })

// }


// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '900s'})
// }


module.exports = router;
