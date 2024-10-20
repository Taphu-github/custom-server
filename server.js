// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { initMqttClient } = require('./services/mqtt'); // Import the MQTT client using CommonJS

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create a custom HTTP server for Next.js
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl); // Handle Next.js requests
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
  // Initialize MQTT listener when the server starts
  initMqttClient();

});
