const Book = require('../models/Book');

module.exports = (req, res) => {

  Book.
    findOneAndDelete({ _id: req.params.id }).
    then(book => {
      res.json({ success : book._id })
    }).
    catch(err => res.status(404).json({ 'notfound': 'book no exists' }));
}
