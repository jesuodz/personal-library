const router = require('express').Router();
const {
  add, getAllBooks
} = require('../../controllers');

router.get('/test', (req, res) => res.json({msg: 'Test works'}));

router.post('/', add);
router.get('/', getAllBooks);

module.exports = router;
