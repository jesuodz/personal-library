const router = require('express').Router();
const {
  add, getAllBooks, deleteOne
} = require('../../controllers');

router.get('/test', (req, res) => res.json({msg: 'Test works'}));

router.post('/', add);
router.get('/', getAllBooks);
router.delete('/:id', deleteOne);

module.exports = router;
