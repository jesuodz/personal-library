const Book = require('../models/Book');

module.exports = (req, res) => {
  Book
    .deleteMany({})
    .then(response => 
      res.json({ 
        msg: 'Complete delete successful',
        booksCount: response.deletedCount
      })
    )
    .catch(err => res.json(err));
}
