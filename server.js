const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy endpoint: all requests to /api proxy to target URL
app.use('/proxy', (req, res, next) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }
  createProxyMiddleware({ target: targetUrl, changeOrigin: true })(req, res, next);
});

// Serve static frontend files
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
