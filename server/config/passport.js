const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./main');

module.exports = function(passport){
    console.log("Passport running");
    let opts = {};
    // Check headers for web token
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    //opts.secretOrKey = process.env.SECRET;
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        
        User.findOne({ _id: jwt_payload._id}, function(err, user){
            if (err) return done(err, false);
            if (user) {
                
                done(null, user);
            } else {
               
                done(null, false);
            }
        });
    }));
}