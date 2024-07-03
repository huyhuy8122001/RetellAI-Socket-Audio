const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', async(req, res) => {
  const {logger} = req.app.locals;
  const {registerCall} = require('../../../lib/utils/retell')(logger);
  logger.info({payload: req.body}, 'POST /retellai');
  const opts = {
    agentId: process.env.RETELL_AGENT_ID,
    from: req.body.from,
    to: req.body.to,
    direction: req.body.direction
  }
  try {
    logger.info({opts}, 'opts');
    const retell_call_id = await registerCall(opts);
    logger.info({retell_call_id}, 'Call registered');
    const app = new WebhookResponse();
    app
      .answer()
      .listen({
        url:  process.env.WS_URL,
        sampleRate: 8000,
        bidirectionalAudio: {
          enabled: true,
          streaming: true,
          sampleRate: 8000
        },
        metadata: {
          retell_call_id
        }
      });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;
