import express from 'express';
import passwordController from '../controllers/passwordController';
const { changePassword, forgotPassword } = passwordController;

const router = express.Router();

router.post('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);

export default router;
