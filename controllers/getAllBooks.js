const Book = require('../models/Book');

module.exports = (req, res) => {
  
  Book.
    aggregate([
      {
        $project: {
          _id: 1,
          title: 1,
          commentCount: {
            count: '$comments'
          }
        }
      }
    ]).
    then(books => res.json(books)).
    catch(err => res.json(err));

  // Book.aggregate([
  //   { $match: {} },
  //   { $group: { commentCount: { $get: "" } }
  // ])
}
