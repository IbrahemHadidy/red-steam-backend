import cors from 'cors';
import dotnet from 'dotenv';
dotnet.config();

// Define allowed origins
const allowedOrigins = [`${process.env.FRONT_URL}`];

// Configure CORS middleware
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Headers',
  ],
  credentials: true,
};

export default cors(corsOptions);
