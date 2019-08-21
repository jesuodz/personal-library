const router = require('express').Router();
const {
  add, getAllBooks, deleteOne, getOne
} = require('../../controllers');

router.get('/test', (req, res) => res.json({msg: 'Test works'}));

router.post('/', add);
router.get('/', getAllBooks);
router.delete('/:id', deleteOne);
router.get('/:id', getOne);

module.exports = router;
