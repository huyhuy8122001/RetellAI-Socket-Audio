const router = require('express').Router();

router.use('/call-status', require('./call-status'));
router.use('/retell', require('./retellai'));

module.exports = router;
