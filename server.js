const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './public')));
app.use('/:id', express.static(path.join(__dirname, './public')))

app.use('/about/:id', createProxyMiddleware({target: 'http://localhost:3003', changeOrigin: true}));

app.use('/api/bookings/:id', createProxyMiddleware({target: 'http://localhost:3002', changeOrigin: true}));

app.use('/api/bookings', createProxyMiddleware({target: 'http://localhost:3002', changeOrigin: true}));

app.use('/api/hotels', createProxyMiddleware({target: 'http://localhost:3001', changeOrigin: true}));

app.use('/api/hotels/:id', createProxyMiddleware({target: 'http://localhost:3001', changeOrigin: true}));

app.use('/roomtips', createProxyMiddleware({target: 'http://localhost:3004', changeOrigin: true}));

app.use('/qas', createProxyMiddleware({target: 'http://localhost:3004', changeOrigin: true}));

app.use('/reviews', createProxyMiddleware({target: 'http://localhost:3004', changeOrigin: true}));


app.listen(port, (err) => {
  console.log(`Server is running on port ${port}!`);
});