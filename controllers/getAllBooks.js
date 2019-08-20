const Book = require('../models/Book');

module.exports = (req, res) => {
  
  const projection = {
    _id: 1,
    title: 1,
    commentCount: {
      $size: '$comments'
    }
  }

  Book.aggregate([{ $project : projection }])
    .then(books => res.json(books))
    .catch(err => res.json(err));
}
