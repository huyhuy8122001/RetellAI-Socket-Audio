const WebSocket = require('ws');

const pipeAudio = async(logger, socket) => {
  let retell_call_id;
  let retellSocket;

  socket.on('message', function(data, isBinary) {
    try {
      if (isBinary) {
        if (retellSocket && retellSocket.readyState === WebSocket.OPEN) {
          retellSocket.send(data);
        }
        return;
      }
      else {
        const obj = JSON.parse(data);
        if (!retell_call_id) {
          retell_call_id = obj.retell_call_id;
          logger.info(`received websocket connection from jambonz with retell_call_id ${retell_call_id}`);

          retellSocket = new WebSocket(`wss://api.retellai.com/audio-websocket/${retell_call_id}?enable_update=true`, 'audio.jambonz.org');
          retellSocket.on('open', () => {
            logger.info(`Established outbound WebSocket connection to retellai with retell_call_id ${retell_call_id}`);
          });
          retellSocket.on('error', (err) => {
            logger.error({err}, `Error with retellai WebSocket connection for retell_call_id ${retell_call_id}`);
          });
          retellSocket.on('close', (code, reason) => {
            logger.info(`Retellai WebSocket connection closed with code: ${code}, reason: ${reason}`);
            socket.close();
          });

          // Handle incoming messages from retellSocket
          retellSocket.on('message', (retellData, retellIsBinary) => {
            if (retellIsBinary) {
              if (socket.readyState === WebSocket.OPEN) {
                socket.send(retellData);
              }
            } else {
              const s = retellData.toString();
              if (s === 'clear') {
                const msg = JSON.stringify({"type": "killAudio"});
                socket.send(msg);
              }
              else {
                try {
                  const obj = JSON.parse(s);
                  logger.debug({obj}, 'received JSON from retellSocket');
                  if (obj.event_type === 'update' && obj.transcript) {
                    const msg = JSON.stringify({"type": "transcription", "transcript": obj.transcript});
                    socket.send(msg);
                  }
                } catch (err) {
                  logger.error({err}, `Error parsing JSON from retellSocket: ${s}`);
                }
              }
            }
          });
        }
        else {
          logger.info({obj}, 'received JSON');
        }
      }
    } catch (err) {
      logger.error({err}, `Error starting upload to bucket ${process.env.RECORD_BUCKET}`);
    }
  });
  socket.on('error', function(err) {
    logger.error({err}, 'recordAudio: error');
  });
  socket.on('close', function(code, reason) {
    logger.info(`WebSocket connection closed with code: ${code}, reason: ${reason}`);
  });
};

module.exports = pipeAudio;
