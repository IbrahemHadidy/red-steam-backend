import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Define reverse proxy middleware
const proxyMiddleware = createProxyMiddleware({
  target: process.env.BASE_URL, // Change the origin of the host header to the target URL
  changeOrigin: true,
});

// Use the reverse proxy middleware for all incoming requests
app.use('/', proxyMiddleware);

export default app;
