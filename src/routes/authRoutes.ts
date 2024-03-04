import express from 'express';
import { login, logout, register, resendRegisterToken } from '../controllers/authController';
import { validate, sanitize, registrationValidationRules, loginValidationRules} from '../middlewares/validators';

const router = express.Router();

router.post('/login', loginValidationRules, validate, sanitize, login);
router.post('/logout', logout); 
router.post('/register', registrationValidationRules, validate, sanitize, register);
router.post('/resend-register-token', resendRegisterToken);

export default router;
