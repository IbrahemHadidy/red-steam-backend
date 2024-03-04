import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import connectToMongoDB from './configs/mongodb';
import usersRoutes from './routes/usersRoutes';
import authRoutes from './routes/authRoutes';
import passwordRoutes from './routes/passwordRoutes';
import fileUploadRoutes from './routes/fileUploadRoutes';
import emailVerificationRoutes from './routes/emailVerificationRoutes';

dotenv.config();
connectToMongoDB();

const app = express();

// Register the JWT strategy with Passport
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount middlewares
app.use(errorHandler);
app.use(logger);

// Mount the API routes
app.use('/api/users', usersRoutes);
app.use('/api/avatar', fileUploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/verify-email', emailVerificationRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
