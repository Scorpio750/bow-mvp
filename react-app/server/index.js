const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
// const session = require('express-session');
// const passport = require('passport');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));

//Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//compression middleware
app.use(compression());

//Static Middleware
// app.use(express.static(path.join(__dirname, 'build', 'index.html')));

//api routes
app.get('/api/ping', function (req, res) {
  return res.send('pong');
 });

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));


// any remaining requests with an extension (.js, .css, etc.) send 404
// app.use((req, res, next) => {
//   if (path.extname(req.path).length) {
//     const err = new Error('Not found')
//     err.status = 404
//     next(err)
//   } else {
//     next()
//   }
// })

// // sends index.html
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
// })

// // error handling endware
// app.use((err, req, res, next) => {
//   console.error(err)
//   console.error(err.stack)
//   res.status(err.status || 500).send(err.message || 'Internal server error.')
// })


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
