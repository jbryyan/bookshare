const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/main');

module.exports = function(req, res){
    User.findOne({
      username: req.body.username
      }, function(err, user){
      if (err) throw err;
      console.log(user);
      console.log(typeof(user));
      //Send user back to login if no user found
      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check that the passwords match
        user.comparePassword(req.body.password, function(err, isMatch){
          console.log(isMatch);
          if (isMatch && !err) {
            //Create token
            //let token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.SECRET, { expiresIn: '1h' });
            let token = jwt.sign(JSON.parse(JSON.stringify(user)), config.secret, { expiresIn: '1h' });
            res.json({ success: true, message: 'JWT ' + token, username: req.body.username, location: user.location });
          } else {
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        });
      }
    });
};