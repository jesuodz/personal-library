const Book = require('../models/Book');

module.exports = (req, res) => {
  
  const projection = {
    _id: 1,
    title: 1,
    commentcount: {
      $size: '$comments'
    }
  }

  Book
    .aggregate([{ $project : projection }])
    .then(books => {
      if (books.length) return res.json(books);
      else {
        res.status(400).json({ 'nobooks': 'no books stored' });
      }
    });
}
