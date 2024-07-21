const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', async(req, res) => {
  const {logger, callsInProgress} = req.app.locals;
  const {agent_number, calling_number} = callsInProgress.get(req.body.call_sid);

  logger.info({payload: req.body, agent_number, calling_number}, 'POST /do-transfer-refer');

  const app = new WebhookResponse();
  app
    .sip_refer({
      referTo: agent_number,
      ...(calling_number && {from: calling_number})
    });
  res.status(200).json(app);
});

module.exports = router;
