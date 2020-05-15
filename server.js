const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

const ReviewService = "http://ec2-54-153-71-183.us-west-1.compute.amazonaws.com:3004";
const PhotoService = "http://ec2-18-220-158-65.us-east-2.compute.amazonaws.com:3001";

app.use(express.static(path.join(__dirname, './public')));

app.use('/about/:id', createProxyMiddleware({target: 'http://localhost:3003', changeOrigin: true}));

app.use('/api/bookings/:id', createProxyMiddleware({target: 'http://localhost:3002', changeOrigin: true}));

app.use('/api/bookings', createProxyMiddleware({target: 'http://localhost:3002', changeOrigin: true}));

app.use('/api/hotels', createProxyMiddleware({target: PhotoService, changeOrigin: true}));

app.use('/api/hotels/:id', createProxyMiddleware({target: PhotoService, changeOrigin: true}));

app.use('/roomtips', createProxyMiddleware({target: ReviewService, changeOrigin: true}));

app.use('/qas', createProxyMiddleware({target: ReviewService, changeOrigin: true}));

app.use('/reviews', createProxyMiddleware({target: ReviewService, changeOrigin: true}));


app.listen(port, (err) => {
  console.log(`Server is running on port ${port}!`);
});