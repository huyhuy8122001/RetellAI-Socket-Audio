const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', async(req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body, query: req.query}, 'POST /do-transfer-dial');

  const app = new WebhookResponse();
  app.dial({
    ...(process.env.CALLER_ID && {callerId: process.env.CALLER_ID}),
    target: [
      {
        type: 'phone',
        number: process.env.TRANSFER_NUMBER
      }
    ]
  });
  res.status(200).json(app);
});

module.exports = router;
