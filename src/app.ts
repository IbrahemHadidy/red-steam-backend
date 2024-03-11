import dotenv from 'dotenv';
import express from 'express';
// import proxyApp from './middlewares/proxy';
import cors from './middlewares/cors';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import connectToMongoDB from './configs/mongodb';
import user from './routes/user';
import admin from './routes/admin';

dotenv.config();
connectToMongoDB();

const app = express();

// Use the CORS middleware
app.use(cors);

// Use the logger middleware
app.use(logger);

// Use the error handler middleware
app.use(errorHandler);

// Use the JSON parser middleware
app.use(express.json());

// Use the URL-encoded parser middleware
app.use(express.urlencoded({ extended: false }));

// Use the reverse proxy middleware
// app.use(proxyApp);

// Mount the API routes
app.use('/api/user', user);
app.use('/api/admin', admin);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
