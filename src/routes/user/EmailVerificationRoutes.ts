import express from 'express';
import EmailVerificationController from '../../controllers/user/EmailVerificationController';
const { verifyEmail } = EmailVerificationController;

const router = express.Router();

router.get('/:verificationToken', verifyEmail);

export default router;
