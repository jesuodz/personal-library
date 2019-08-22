const Book = require('../models/Book');
const titleValidator = require('../validation/title');

module.exports = (req, res) => {
  const errors = titleValidator(req.body);

  if (errors) return res.status(400).json(errors);

  const newBook = new Book({
    title: req.body.title
  });

  newBook.save().then( book => res.json(book));
}
