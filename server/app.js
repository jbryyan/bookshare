// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const config = require('./config/main');
const register = require('./controllers/register');
const auth = require('./controllers/authenticate');
const addBook = require('./controllers/addBook');
const searchBook = require('./controllers/searchBook');
const browseBooks = require('./controllers/browseBooks');
const booksOwn = require('./controllers/booksOwn');
const mongoose = require('mongoose');
const passport = require('passport');

// Setup logger
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Initialize passport
//app.use(passport.initialize());

//Connect to db using mongoose
//mongoose.connect(process.env.URL, { useMongoClient: true });
mongoose.connect(config.database, { useMongoClient: true });

// Bring in passport strategy
require('./config/passport')(passport);

//Register user to db.
app.post('/api/register', register);

//Authentice login username/password
app.post('/api/authenticate', auth);

//Authenticate token
// Protect dashboard route with JWT
app.get('/api/tokenAuth', function(req, res, next){
  passport.authenticate('jwt', { session: false}, function(err, user, info){
    if (err) { return next(err); }
    if (!user) { return res.json({success: false, message: "Token is not valid."}); }
    console.log('Success');
    console.log(user.location);
    res.json({ success: true, username: user.username, location: user.location });
  })(req, res, next);
});

//---------------------------------
//Search for book using google API
app.get('/api/searchBook', searchBook);

//Add book to user in db.
app.post('/api/addBook', addBook);

//Grab user owned books list
app.get('/api/booksOwn', booksOwn);

//Grab book list
app.get('/api/browseBooks', browseBooks);

module.exports = app;
