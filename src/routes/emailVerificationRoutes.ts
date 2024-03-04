import express from 'express';
import { verifyEmail } from '../controllers/emailVerificationController';

const router = express.Router();

router.get('/:verificationToken', verifyEmail);

export default router;
