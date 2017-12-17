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
          let owns = false;
          book.bookUsers.forEach((data) => {
            if(data.username === user.username){
              book.userOwns = true;
              owns = true;
            }
          });
          if(!owns){
            newBooks.push(book);
          }
        });
        console.log(newBooks);

        newBooks.forEach((book, index) => {
          let inWishList = false;
          book.userWishlist.forEach((wishlistData) => {
            if (wishlistData.username === user.username){
              newBooks[index].userInWishlist = true;
            }
          });
        });
        
        res.json({ success: true, message: newBooks });
      });
    }
  })(req, res);
};