const express = require('express');
const vector = require('../controllers/vector');

const router = express.Router();

router.use(require('../middlewares/verifyToken'));

router.get('/', vector.getAll);
router.post('/', vector.add);
router.delete('/', vector.remove);

module.exports = router;
