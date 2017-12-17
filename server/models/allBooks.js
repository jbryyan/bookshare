const mongoose = require('mongoose');


// User schema
const BookSchema = new mongoose.Schema({

    bookId: { type: String },
    bookData: { type: Object },
    bookUsers: [
      { _id: false,
        username: { type: String } 
      }
    ],
    userOwns: { type: Boolean, default: false },
    userWishlist: [
      { 
        _id: false,
        username: { type: String } 
      }
    ], 
    userInWishlist: { type: Boolean, default: false }
}, {collection: 'books' });

module.exports = mongoose.model('Books', BookSchema);