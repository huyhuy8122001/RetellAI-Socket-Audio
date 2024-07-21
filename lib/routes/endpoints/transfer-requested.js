const router = require('express').Router();

router.post('/', async(req, res) => {
  const {logger, client} = req.app.locals;
  const payload = req.body;
  const {call_sid} = payload?.call?.metadata;

  if (!process.env.TRANSFER_NUMBER) {
    logger.info('No transfer number configured');
    return res.sendStatus(503);
  }
  res.sendStatus(200);

  const call_hook = process.env.TRANSFER_USING_REFER ? '/do-transfer-refer' : '/do-transfer-dial';
  if (call_sid) {
    try {
      await client.calls.update(call_sid, {call_hook});
      logger.info({call_sid, call_hook}, 'Initiated transfer');
    } catch (err) {
      logger.error({err}, 'Error initiating transfer');
    }
  }
});

module.exports = router;
