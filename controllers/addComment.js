const Book = require('../models/Book');

module.exports = (req, res) => {
  console.log(req.params.id);
  Book.
    findOne({ _id: req.params.id }).
    then(book => {
      const comment = { text: req.body.comment };
      // Save and sort comment by most recent
      book.comments.unshift(comment);
      res.json(book);
    }).
    catch(err => res.status(404).json({notfound: 'book not found'}));
};
