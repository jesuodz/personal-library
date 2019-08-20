const Book = require('../models/Book');

module.exports = (req, res) => {
  
  Book.find({}).then(books => {
    const booksCommentCount = books.map(book => {
      return {
        ...book._doc,
        commentCount: book.comments.length
      }
    });

    res.json(booksCommentCount);
  });
}
