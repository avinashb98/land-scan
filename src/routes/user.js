const express = require('express');
const user = require('../controllers/user');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/', user.signUp);
router.post('/login', user.login);

// Protected Routes

// Verify JWT Token
router.use(verifyToken);

module.exports = router;
