const { Router } = require('express');
const router = Router();
const books = require('./books');
const authors = require('./authors');

router.use('/api', books);
router.use('/api', authors);

module.exports = router;