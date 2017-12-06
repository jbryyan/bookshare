const mongoose = require('mongoose');


// User schema
const BarSchema = new mongoose.Schema({

    books: [
        { 
            data: { type: Object },
            usersOwnBook: { type: String }
        }
    ]
}, {collection: 'books' });



module.exports = mongoose.model('User', UserSchema);