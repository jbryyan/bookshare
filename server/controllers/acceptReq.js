const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/main');
const passport = require('passport');
const Books = require('../models/allBooks');

module.exports = function (req, res) {
  //console.log(typeof(req.body.bookData));
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({ success: false, message: "Token is not valid." }); }

    //Will Remove the book request from the users db.
    /*
    User.update(
      { username: user.username },
      { $pull: { requests: { bookId: req.body.bookData.bookId } } },
      function (err, doc){
        if (err) throw err;
      }
    );
    */
    let bookId = req.body.bookData.bookId;
    let bookData = req.body.bookData.bookData;
    let userReq = req.body.bookData.userReq;

    let promises = [
      //Will remove book requested from the requested array in users db
      User.update({ username: user.username }, { $pull: { requests: { bookId: bookId } } }).then(),
      //Will remove book requested from users book owned array in users db
      User.update({ username: user.username }, { $pull: { books: { bookId: bookId } } }).then(),
      //Will update the books given for the user in the db
      User.findOneAndUpdate(
        { username: user.username }, { $push: { given: { bookId: bookId, bookData: bookData } } },
        { new: true }
      ).then(),
      //Will remove the user from the bookusers array in the browsing db that stores all the books.
      Books.findOneAndUpdate(
        { bookId: bookId }, { $pull: { bookUsers: { username: user.username } } },
        { new: true }
      ).then(),
      //************//
      //Will update the wishlist of the user that requested the book. Will remove it from their list.
      User.update({ username: userReq }, { $pull: { wishlist: { bookId: bookId } } }).then(),
      //Will update the update the books received of user that requested book.
      User.update({ username: userReq }, { $push: { received: { bookId: bookId, bookData: bookData } } }).then(),
    ];

    //Used to fulfill all mongo updates according to the user accepting the book request.
    Promise.all(promises).then(function (results) {
    
      let myBookData = [];
      let objectKey = ['books', 'wishlist', 'requests', 'given', 'received'];
      for (i = 0; i < 5; i++) {
        myBookData.push({ [objectKey[i]]: results[2][objectKey[i]] });
      }
      //Checks to see if the book that was requested for a trade does not have users that own the book anymore.
      //If no users own the book anymore, remove from the database collection that the browsing page shows.
      if (results[3].bookUsers.length === 0){
        Books.remove({ bookId: results[3].bookId }, function(err, doc){
          if (err) throw err;
          res.json({ success: true, message: myBookData });
        });
      }else{
        res.json({ success: true, message: myBookData });
      }
    }).catch(function (err) {
      console.log(err);
    });

    /*
    //Updates the user that requested the book with the new book received.
    User.update(
      { username: req.body.bookData.userReq },
      { $push: { received: { bookId: req.body.bookData.bokId, bookData: req.body.bookData.bookData } } }
    );

    //Updates the user that requested the book by removing the book from their wishlist.
    User.update(
      { username: req.body.bookData.userReq },
      { $pull: { wishlist: { bookId: req.body.bookData.bookId } } }
    );
    */

    //res.json({ success: true, message: 'Yes' });
  })(req, res);
};