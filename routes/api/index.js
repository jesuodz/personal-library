const router = require('express').Router();
const {
  add, getAllBooks, deleteOne, getOne, addComment
} = require('../../controllers');

router.get('/test', (req, res) => res.json({msg: 'Test works'}));

/**
 * Add a book
 * 
 * @route POST /api/books/
 * @param {Object} [title=value]
 * @return {Object} a title error if no sent, 
 *                  otherwise a new book.
 */
router.post('/', add);

/**
 * Require all books from database
 * 
 * @route GET /api/books/
 * @return {Array} Of books if books are found.
 */
router.get('/', getAllBooks);

/**
 * Delete a book by ID
 * 
 * @route DELETE /api/books/:id
 * @param {:id} ObjectID
 * @return {Object} A success property with book ID
 */
router.delete('/:id', deleteOne);

/**
 * Find a book by ID
 * 
 * @route GET /api/books/:id
 * @param {:id} ObjectID
 * @return {Object} A book
 */
router.get('/:id', getOne);

/**
 * Add a comment to a book
 * 
 * @route GET /api/books/:id
 * @param {:id} ObjectID
 * @param {Object} [text=value]
 * @return {Object} A book with sorted comments by date.
 */
router.post('/:id', addComment);

module.exports = router;
