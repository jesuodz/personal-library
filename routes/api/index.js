const router = require('express').Router();
const {
  add
} = require('../../controllers');

router.get('/test', (req, res) => res.json({msg: 'Test works'}));

router.post('/', add);

module.exports = router;
