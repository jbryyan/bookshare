const User = require('../models/user');
const Books = require('../models/allBooks');
const jwt = require('jsonwebtoken');
const config = require('../config/main');
const passport = require('passport');

module.exports = function(req, res){
  //console.log(typeof(req.body.bookData));
  passport.authenticate('jwt', { session: false}, function(err, user, info){
    if (err) { return next(err); }
    if (!user) { 
      Books.find({}, { '_id': 0 }, function(err, doc){
        if (err) throw err;
        res.json({ success: true, message: doc });
      });
    }else{
      Books.find({}, { '_id': 0 }, function(err, doc){
        if (err) throw err;
        let newBooks = [];
        doc.forEach((book, index) =>{
          book.bookUsers.forEach((data) => {
            console.log(data.username);
            if(data.username !== user.username){
              newBooks.push(book);
            }
          });
        });
        res.json({ success: true, message: newBooks });
      });
    }
  })(req, res);
};