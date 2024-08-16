const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api/users', createProxyMiddleware({
  target: 'http://users:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': ''
  }
}));
// Proxy para el servicio de reservas
app.use('/api/reservations', (req, res, next) => {
  console.log('Request received at API Gateway for reservations:', req.method, req.url);
  next();
}, createProxyMiddleware({
  target: 'http://reservations:3000',
  changeOrigin: true,
  pathRewrite: { '^/api/reservations': '' }
}));
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`API Gateway corriendo en el puerto ${PORT}`);
});