const Book = require('../models/Book');
const mongoose = require('mongoose');

module.exports = (req, res) => {

  Book.
    findOne({ _id: req.params.id }).
    then(book => res.status(200).json(book)).
    catch(err => res.status(404).json({ notfound: 'book not found' }));
}
