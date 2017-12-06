const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        minlength: [5, 'Username must me at least 5 characters long.']
    },
    password: {
        type: String,
        required: true
    },
    location: {
      type: String
    },
    books: [
      { type: Object }
    ]
}, {collection: 'users' });

// Save the users hashed pwd.
UserSchema.pre('save', function(next){
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt){
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Method to compare password with pwd in db.
UserSchema.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, function(err, isMatch){
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);