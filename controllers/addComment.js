const Book            = require('../models/Book');
const validateComment = require('../validation/comment');

module.exports = (req, res) => {
  const { errors, isValid } = validateComment(req.body);

  if (!isValid) return res.status(400).json(errors);

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
