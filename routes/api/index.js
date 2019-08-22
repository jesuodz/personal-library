const router = require('express').Router();
const {
  add, getAllBooks, deleteOne, getOne, addComment
} = require('../../controllers');

router.get('/test', (req, res) => res.json({msg: 'Test works'}));

router.post('/', add);
router.get('/', getAllBooks);
router.delete('/:id', deleteOne);
router.get('/:id', getOne);
router.post('/:id', addComment);

module.exports = router;
