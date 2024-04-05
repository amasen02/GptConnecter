const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const crypto = require('crypto');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const requestIds = {};
const clients = new Set();

function logRequest(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration} ms`
    );
  });
  next();
}

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected to WebSocket.');

  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
    handleWebSocketMessage(message.toString(), ws);
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected from WebSocket.');
  });
});

app.use(logRequest);
app.use(express.json());

const handleWebSocketMessage = (message, client) => {
  const data = JSON.parse(message);

  if (data.type === 'response') {
    const requestId = data.requestId;
    const requestPath = requestIds[requestId].path;

    if (requestPath === '/chat/completions') {
      const formattedResponse = {
        callbackContent: requestIds[requestId].callbackContent,
        id: requestId,
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model: 'gpt-4',
        usage: {
          prompt_tokens: 1,
          completion_tokens: 1,
          total_tokens: 2,
        },
        choices: [
          {
            message: {
              role: 'assistant',
              content: data.content,
            },
            finish_reason: 'stop',
            index: 0,
          },
        ],
      };

      requestIds[requestId].res.status(200).json(formattedResponse);
    } else {
      const responseData = {
        data: data.content,
        url: data.currentUrl,
        requestId: requestId,
        callbackContent: requestIds[requestId].callbackContent,
      };
      requestIds[requestId].res.status(200).json(responseData);
    }

    requestIds[requestId].responseSent = true;
  }
};

const sendMessage = async (req, res) => {
  const requestId = Date.now();
  const { messages, onlyText } = req.body;
  const isOnlyText = onlyText === 1;

  requestIds[requestId] = { path: req.path, onlyText: isOnlyText, responseSent: false, callbackContent: req.body.callbackContent, res };

  const activeClients = Array.from(clients).filter(client => client.readyState === WebSocket.OPEN);

  if (activeClients.length === 0) {
    res.status(503).json({ error: 'Browser Extension disconnected', callbackContent: req.body.callbackContent });
    return;
  }

  let message;
  if (req.path === '/chat/completions') {
    console.log(
      `Request received: ${req.method} ${req.path} ${JSON.stringify(req.body)}`
    );
    message = messages
      ? messages
          .map((message) => `${message.role}: ${message.content}`)
          .join('\n')
      : '';
    console.log('Combined messages:', message);
  } else {
    message = req.body.message;
    console.log('Request received:', req.method, req.path, JSON.stringify(req.body));
  }

  const promises = activeClients.map((client) => {
    return new Promise((resolve, reject) => {
      client.send(JSON.stringify({ type: 'new-message', message, requestId, onlyText: isOnlyText }), (err) => {
        if (err) {
          console.error('Error sending message:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });

  await Promise.all(promises);

  setTimeout(() => {
    if (!requestIds[requestId].responseSent) {
      res.status(408).json({ error: 'Request timeout', callbackContent: requestIds[requestId].callbackContent });
      delete requestIds[requestId];
    }
  }, 120000);
};

const sendStopMessage = async (req, res) => {
  const stopReq = {
    ...req,
    path: '/stop',
    body: {
      ...req.body,
      message: 'stop',
    },
  };
  await sendMessage(stopReq, res);
};

app.post('/send-message', sendMessage);
app.post('/chat/completions', sendMessage);
app.post('/stop', sendStopMessage);

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
