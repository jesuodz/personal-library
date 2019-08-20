const router = require('express').Router();

router.all('*', (req, res) => {
  res.status(404).json({ notfound: 'resource not found' })
});

module.exports = router;
