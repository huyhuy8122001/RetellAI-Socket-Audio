const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', async(req, res) => {
  const {logger, callsInProgress} = req.app.locals;
  const {agent_number, calling_number} = callsInProgress.get(req.body.call_sid);

  logger.info({payload: req.body, agent_number, calling_number}, 'POST /do-transfer-dial');

  const app = new WebhookResponse();
  app.dial({
    ...(calling_number && {callerId: calling_number}),
    target: [
      {
        type: 'phone',
        number: agent_number
      }
    ]
  });
  res.status(200).json(app);
});

module.exports = router;
