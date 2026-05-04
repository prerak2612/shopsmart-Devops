const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const clientBuildDir = path.resolve(__dirname, '../../client/dist');
const clientIndexFile = path.join(clientBuildDir, 'index.html');

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// When the frontend bundle exists, serve it from the same container so ECS
// only needs to manage one web service.
if (fs.existsSync(clientBuildDir)) {
  app.use(express.static(clientBuildDir));
}

// Root Route
app.get('/', (req, res) => {
  if (fs.existsSync(clientIndexFile)) {
    return res.sendFile(clientIndexFile);
  }

  return res.send('ShopSmart Backend Service');
});

module.exports = app;
