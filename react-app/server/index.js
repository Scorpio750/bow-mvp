require('dotenv').config();
const express = require('express');
const session = require('express-session');
//cors shares resources around multuple sites
// const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const { db } = require('./db')
// const passport = require('passport');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(morgan('dev'));

//Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//compression middleware
app.use(compression());

//Static Middleware
app.use(express.static(path.join(__dirname, 'build', 'index.html')));

// app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET, // or whatever you like
  // this option says if you haven't changed anything, don't resave. It is recommended and reduces session concurrency issues
  resave: false,
  // this option says if I am new but not modified still save
  saveUninitialized: true
}))

db.sync()
 //For future Auth or Auth routes
app.use('/api', require('./api'));
// app.use('/auth', require('./auth'));


//api routes
app.get('/ping', function (req, res) {
  return res.send('pong');
 });


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


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
