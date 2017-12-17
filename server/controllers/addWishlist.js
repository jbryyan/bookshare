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

    console.log(req.body.data);
    
    User.findOneAndUpdate(
      { username: user.username },
      { $push: { wishlist: { bookId: req.body.data.bookId, bookData: req.body.data.bookData }}},
      function(err, doc){
        if (err) throw err;
        console.log("Updated");
        User.update(
          { 'books.bookId': req.body.data.bookId },
          { $push: { requests: { bookId: req.body.data.bookId, bookData: req.body.data.bookData, userReq: user.username }}},
          { multi: true },
          function(err, doc){
            if (err) throw err;
            
          }
        );
      }
    ); 

    Books.findOneAndUpdate(
      { bookId: req.body.data.bookId },
      { $push: { userWishlist: { username: user.username } }},
      function(err, doc){
        if (err) throw err;
        else{
          let newBookData = req.body.data;
          newBookData.userInWishlist = true;
          res.json({ success: true, message: newBookData });
        }
      }
    ); 

  })(req, res);
};