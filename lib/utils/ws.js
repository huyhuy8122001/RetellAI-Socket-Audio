const WebSocket = require('ws');

const pipeAudio = async(logger, socket) => {
  let retell_call_id;
  let retellSocket;

  socket.on('message', function(data, isBinary) {
    try {
      if (isBinary) {
        if (retellSocket && retellSocket.readyState === WebSocket.OPEN) {
          logger.info('sendng audio data to retell');
          retellSocket.send(data);
        }
        return;
      }
      else {
        const obj = JSON.parse(data);
        if (!retell_call_id) {
          retell_call_id = obj.retell_call_id;
          logger.info(`received websocket connection from jambonz with retell_call_id ${retell_call_id}`);

          retellSocket = new WebSocket(`wss://api.retellai.com/audio-websocket/${retell_call_id}`, 'audio.jambonz.org');
          retellSocket.on('open', () => {
            logger.info(`Established outbound WebSocket connection to retellai with retell_call_id ${retell_call_id}`);
          });
          retellSocket.on('error', (err) => {
            logger.error({err}, `Error with retellai WebSocket connection for retell_call_id ${retell_call_id}`);
          });
          retellSocket.on('close', (code, reason) => {
            logger.info(`Retellai WebSocket connection closed with code: ${code}, reason: ${reason}`);
          });

          // Handle incoming messages from retellSocket
          retellSocket.on('message', (retellData, retellIsBinary) => {
            logger.info(`Received message from retellSocket, binary: ${retellIsBinary}`);
            if (retellIsBinary) {
              if (socket.readyState === WebSocket.OPEN) {
                socket.send(retellData, { binary: true });
              }
            } else {
              logger.info(`Received JSON from retellSocket: ${retellData}`);
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
