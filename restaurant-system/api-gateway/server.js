const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/reservas', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway corriendo en el puerto ${PORT}`);
});


