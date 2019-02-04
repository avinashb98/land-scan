const express = require('express');
const vector = require('../controllers/vector');

const router = express.Router();

router.use(require('../middlewares/verifyToken'));

router.post('/', vector.add);
router.get('/', vector.getAll);

module.exports = router;
