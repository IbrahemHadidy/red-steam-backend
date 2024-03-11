import AuthRoutes from './user/AuthRoutes';
import PasswordRoutes from './user/PasswordRoutes';
import FileUploadRoutes from './user/FileUploadRoutes';
import EmailVerificationRoutes from './user/EmailVerificationRoutes';
import UserInteractionRoutes from './user/UserInteractionRoutes';
import PhoneRoutes from './user/PhoneRoutes';
import express from 'express';

const app = express();

// Mount the API routes
app.use('/avatar', FileUploadRoutes);
app.use('/auth', AuthRoutes);
app.use('/password', PasswordRoutes);
app.use('/verify-email', EmailVerificationRoutes);
app.use('/interaction', UserInteractionRoutes);
app.use('/phone', PhoneRoutes);

export default app;