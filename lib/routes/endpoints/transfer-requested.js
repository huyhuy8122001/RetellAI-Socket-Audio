const router = require('express').Router();

router.post('/', async(req, res) => {
  const {logger, callsInProgress, client} = req.app.locals;
  const payload = req.body;
  const {call_sid} = payload?.call?.metadata;
  const {agent_number, use_sip_refer, calling_number} = payload.args;

  logger.info({agent_number, use_sip_refer, calling_number, payload}, 'transfer requested');
  if (!agent_number) {
    logger.info('No agent_number provided in tool call!');
    return res.sendStatus(503);
  }

  const call_hook = use_sip_refer ? '/do-transfer-refer' : '/do-transfer-dial';
  if (call_sid) {
    const obj = {
      ...callsInProgress.get(call_sid),
      agent_number,
      calling_number
    };
    callsInProgress.set(call_sid, obj);
    try {
      await client.calls.update(call_sid, {call_hook});
      logger.info({call_sid, call_hook}, 'Initiated transfer');
      return res.sendStatus(200);
    } catch (err) {
      logger.error({err}, 'Error initiating transfer');
      return res.sendStatus(503);
    }
  }
  res.sendStatus(404);
});

module.exports = router;
