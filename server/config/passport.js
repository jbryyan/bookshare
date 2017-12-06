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
        console.log(jwt_payload);
        console.log("Payload id: ");
        console.log(jwt_payload._id);
        User.findOne({ _id: jwt_payload._id}, function(err, user){
            if (err) return done(err, false);
            if (user) {
                console.log("User");
                console.log(user);
                done(null, user);
            } else {
                console.log("False");
                done(null, false);
            }
        });
    }));
}