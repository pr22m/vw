const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
  res.send('hello from user');
});

module.exports = router;
