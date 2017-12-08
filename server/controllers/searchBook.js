const User = require('../models/user');
const passport = require('passport');
const Request = require('superagent');

// Bring in passport strategy

module.exports = function(req, res){
  //console.log(typeof(req.body.bookData));
  console.log(req.query.search);
  passport.authenticate('jwt', { session: false}, function(err, user, info){
    if (err) { return next(err); }
    if (!user) { return res.json({success: false, message: "Token is not valid."}); }
    let googleBooksApi = `https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=20`;
    Request.get(googleBooksApi)
    .then((apiRes, err) => {
      if (err) throw err;
      let bookData = JSON.parse(apiRes.text);
      console.log(bookData);
      if(bookData.totalItems > 0){
        //res.json({ success: true, bookData: bookData.items });
        User.find(
          { username: user.username },
          function(err, doc){
            if (err) throw err;
            console.log(doc[0].books);
            for(var i = 0; i < bookData.items.length; i++){
              bookData.items[i].userOwns = false;
              for(var j = 0; j < doc[0].books.length ; j++){
                if(doc[0].books[j].bookData.id === bookData.items[i].id){
                  bookData.items[i].userOwns = true;
                  break;
                }
              }
            }
            res.json({ success: true, bookData: bookData.items });
          }
        ); 
      } else {
        res.json({ success: false });
      }
    });
    //res.json({ success: true, message: 'Got your query.' });
  })(req, res);
};