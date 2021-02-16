const jwt = require('jsonwebtoken');
const router = require('express').Router();

//Need to figure out how to connect the user to the token
router.get('/', (req, res, next) => {
  res.send('yooo')
})
let refreshTokens = [];

router.post('/login', (req, res, next) => {
  //Authenticate user
  // send user name and password, + send back a token
  try{
  console.log('in cookie', req.body)
  const {username, password } = req.body;
  const user = { name: username, password }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken})
  } catch(err) {
    next(err)
  }
})

router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name})
    res.json(accessToken)
  })

})

router.delete('/logout', (req, res, next) => {
  refreshTokens = refreshTokens.filter(token  => token !== req.body.token)
  res.send(204)
})


function authenticateToken(req, res, next) {
  //how do I get the token attached to the
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  //no token found so unauthorized
  if(token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //unverified
    if(err) return res.sendStatus(403);
    req.user = user
    next()
  })

}


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '900s'})
}


module.exports = router;
