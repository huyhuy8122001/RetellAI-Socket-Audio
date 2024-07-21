const router = require('express').Router();

router.use('/call-status', require('./call-status'));
router.use('/retell', require('./retellai'));
router.use('/transfer-requested', require('./transfer-requested'));
router.use('/do-transfer-dial', require('./do-transfer-dial'));
router.use('/do-transfer-refer', require('./do-transfer-refer'));

module.exports = router;
