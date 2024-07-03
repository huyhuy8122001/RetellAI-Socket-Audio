const {request} = require('undici');

module.exports = (logger) => {

  /**
 * https://docs.retellai.com/api-references/register-call
 */
  const registerCall = async({
    agentId,
    from,
    to,
    direction,
    endAfterSilenceMs
  }) => {

    try {
      const payload = {
        agent_id: agentId,
        audio_websocket_protocol: 'web',
        audio_encoding: 's16le',
        sample_rate: 8000,
        from,
        to,
        direction,
        ...(endAfterSilenceMs && {end_after_silence_ms: endAfterSilenceMs})
      };
      const {statusCode, headers, trailers, body} = await request('https://api.retellai.com/register-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RETELL_API_KEY}`
        },
        body: JSON.stringify(payload)
      });
      const data = await body.json();
      if (statusCode !== 201 || !data?.call_id) {
        logger.error({statusCode, data}, 'Error registering call');
        throw new Error(`Error registering call: ${data.error_message}`);
      }
      return data.call_id;
    } catch (err) {
      logger.error(err, 'Error registering call');
      throw(err);
    }
  };

  return {
    registerCall
  };

};
