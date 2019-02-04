const express = require('express');
const region = require('../controllers/region');

const router = express.Router();

router.use(require('../middlewares/verifyToken'));

router.post('/', region.add);

module.exports = router;
