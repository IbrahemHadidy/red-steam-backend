import express from 'express';
import { sanitize } from '../../middlewares/validators';
import PhoneController from '../../controllers/user/PhoneController';

const router = express.Router();
const phoneController = PhoneController;

const {
  sendOTP,
  verifyOTP,
  resendOTP,
  changePhoneNumber,
  removePhoneNumber,
  verifyPhoneNumber,
  sendVerificationCode,
  verifyVerificationCode,
} = phoneController;

router.post('/send-otp', sanitize, sendOTP);
router.post('/verify-otp', sanitize, verifyOTP);
router.post('/resend-otp', sanitize, resendOTP);
router.post('/change-phone-number', sanitize, changePhoneNumber);
router.post('/remove-phone-number', sanitize, removePhoneNumber);
router.post('/verify-phone-number', sanitize, verifyPhoneNumber);
router.post('/send-verification-code', sanitize, sendVerificationCode);
router.post('/verify-verification-code', sanitize, verifyVerificationCode);

export default router;
