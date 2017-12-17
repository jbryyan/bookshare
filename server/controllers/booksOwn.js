const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/main');
const passport = require('passport');

module.exports = function(req, res){
  //console.log(typeof(req.body.bookData));
  passport.authenticate('jwt', { session: false}, function(err, user, info){
    if (err) { return next(err); }
    if (!user) { return res.json({success: false, message: "Token is not valid."}); }
    User.find(
      { username: user.username },
      function(err, doc){
        if (err) throw err;
        let myBookData = [];
        let objectKey = ['books', 'wishlist', 'requests', 'given', 'received'];
        //console.log(doc[0][objectKey[0]])
        
        for (i = 0; i < 5; i++){
          myBookData.push({ [objectKey[i]]: doc[0][objectKey[i]] });
        }
        console.log(myBookData);
        res.json({ success: true, message: myBookData });
      }
    ); 
  })(req, res);
};