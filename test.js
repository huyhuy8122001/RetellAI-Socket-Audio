const assert = require('assert');
assert.ok(process.env.RETELL_API_KEY, 'You must define the RETELL_API_KEY env variable');
assert.ok(process.env.RETELL_AGENT_ID, 'You must define the RETELL_AGENT_ID env variable');

const opts = Object.assign({
  timestamp: () => `, "time": "${new Date().toISOString()}"`,
  level: process.env.LOGLEVEL || 'info'
});
const logger = require('pino')(opts);
const {registerCall} = require('./lib/utils/retell')(logger);

registerCall({
  agentId: process.env.RETELL_AGENT_ID,
  from: '1234',
  to: '5678',
  direction: 'inbound'
}).then((response) => {
  logger.info({response}, 'call registered');
}).catch((err) => {
  logger.error(err, 'Error registering call');
});

