const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/main');
const passport = require('passport');
const Books = require('../models/allBooks');

module.exports = function(req, res){
  //console.log(typeof(req.body.bookData));
  passport.authenticate('jwt', { session: false}, function(err, user, info){
    if (err) { return next(err); }
    if (!user) { return res.json({success: false, message: "Token is not valid."}); }

    let bookData = req.body.bookData.volumeInfo;
    bookData.id = req.body.bookData.id;

    Books.find(
      { bookId: req.body.bookData.id },
      function(err, doc){
        if (err) {
          throw error;
        }
        console.log(doc.length);
        if(doc.length){
          console.log("Exists");
          Books.findOneAndUpdate(
            { bookId: req.body.bookData.id },
            { $push: { bookUsers: { username: user.username }}},
            function(err, doc){
              if (err) throw err;
              console.log("Updated");
            }
          ); 
        }else{
          console.log("DOesnt exist.");
          let newBooks = new Books({ 
            bookId: req.body.bookData.id,
            bookData: bookData,
            bookUsers: [
              { username: user.username }
            ]
          });
          newBooks.save((err) =>{
            if(err) throw err;
            console.log("Saved book");
          });
        }
      }
    ); 
    User.findOneAndUpdate(
      { username: user.username },
      { $push: { books: { bookId: req.body.bookData.id, bookData: bookData }}},
      { new: true },
      function(err, doc){
        if (err) throw err;
        res.json({ success: true, message: doc.books });
      }
    ); 
  })(req, res);
};