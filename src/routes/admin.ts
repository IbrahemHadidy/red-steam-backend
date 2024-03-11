import UserAdminRoutes from './admin/UserAdminRoutes';
import express from 'express';

const app = express();

// Mount the API routes
app.use('/users', UserAdminRoutes);

export default app;
