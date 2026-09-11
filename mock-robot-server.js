const express = require('express');
const { WebSocketServer } = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const WS_PORT = 5001;

// --- Mock State ---
let robotState = {
  mode: 'IDLE',
  battery: 85,
  room: 'Living Room',
  last_event: 'System initialized',
  last_timestamp: new Date().toLocaleTimeString(),
};

// --- REST API Endpoints ---

app.get('/status', (req, res) => {
  console.log('📱 App requested status');
  res.json(robotState);
});

app.get('/sensors', (req, res) => {
  res.json({ front: '45cm', rear: '120cm', right: '30cm' });
});

app.post('/emergency', (req, res) => {
  console.log('🚨 EMERGENCY TRIGGERED!');
  robotState.mode = 'EMERGENCY';
  res.json({ status: 'success', message: 'Emergency alert sent' });
});

app.get('/move/:dir', (req, res) => {
  console.log(`🤖 Moving: ${req.params.dir}`);
  res.json({ status: 'success', direction: req.params.dir });
});

app.post('/navigate', (req, res) => {
  console.log(`📍 Navigating to: ${req.body.room}`);
  res.json({ status: 'success', room: req.body.room });
});

app.get('/battery', (req, res) => {
  res.json({ battery: robotState.battery });
});

// --- WebSocket Signaling Server ---

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', (ws) => {
  console.log('🔌 App connected to signaling server');

  // Periodically send status updates to the app
  const timer = setInterval(() => {
    const update = {
      type: 'STATUS_UPDATE',
      mode: robotState.mode,
      battery: robotState.battery - 1, // Simulate battery drain
    };
    ws.send(JSON.stringify(update));
  }, 5000);

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('📩 Received from App:', data);

    // Echo WebRTC signals back (simplified loopback for testing)
    if (data.type === 'WEBRTC_SIGNAL') {
      console.log('📡 WebRTC Signal relayed...');
      ws.send(JSON.stringify({
        type: 'WEBRTC_SIGNAL',
        payload: data.payload
      }));
    }
  });

  ws.on('close', () => {
    console.log('🔌 App disconnected');
    clearInterval(timer);
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 SENTRA Mock Server running!`);
  console.log(`REST API: http://localhost:${PORT}`);
  console.log(`WebSocket: ws://localhost:${WS_PORT}`);
  console.log(`\n👉 IMPORTANT: In the app, use your COMPUTER'S IP address, NOT localhost.`);
});
