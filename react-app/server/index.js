require('dotenv').config();
const express = require('express');
const session = require('express-session');
//cors shares resources around multiple sites
// const cors = require('cors');
//was using with passport-jwt
// const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const passport = require('passport')
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const { db } = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 3001;
const app = express();

// passport registration
//if successful, serialization creates req.user
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

function createApp() {

  //logging middleware for dev only
  app.use(morgan('dev'));

  //parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  //compression middleware
  app.use(compression());

  //static Middleware
  app.use(express.static(path.join(__dirname, 'build', 'index.html')));

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET, // or whatever you like
    // this option says if you haven't changed anything, don't resave. It is recommended and reduces session concurrency issues
    resave: false,
    store: sessionStore,
    // this option says if I am new but not modified still save
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000 // 1 hour
    }

  }))

  //was using with passport-jwt variations
  // app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET));


  app.use(passport.initialize())
  app.use(passport.session())

  //auth routes
  app.use('/auth/', require('./auth'));
  //api routes
  app.use('/api', require('./api'));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  });
}

bootApp()
