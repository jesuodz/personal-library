const Book = require('../models/Book');

module.exports = (req, res) => {
  
  const newBook = new Book({
    title: req.body.title
  });

  newBook.save().then( book => res.json(book));
}
