const mongoose = require('mongoose');


// User schema
const BookSchema = new mongoose.Schema({

    bookId: { type: String },
    bookData: { type: Object },
    bookUsers: [
      { _id: false,
        username: { type: String } 
      }
    ]
}, {collection: 'books' });

/*
BookSchema.pre('save', function(next){
  let user = this;
  console.log("In prehook save");
  return next();
});
*/
module.exports = mongoose.model('Books', BookSchema);