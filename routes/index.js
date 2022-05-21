const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication');

router.use('/auth',require('./auth'));
router.use('/users', authenticate, require('./users'));
router.use('/books', authenticate, require('./books'));

module.exports = router;