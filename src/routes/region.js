const express = require('express');
const region = require('../controllers/region');

const router = express.Router();

router.use(require('../middlewares/verifyToken'));

router.get('/', region.getAll);
router.post('/', region.add);
router.delete('/', region.remove);
router.put('/', region.update);

module.exports = router;
