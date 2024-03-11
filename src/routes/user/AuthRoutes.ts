import express from 'express';
import {
  validate,
  sanitize,
  registrationValidationRules,
  loginValidationRules,
  changeEmailValidationRules,
  changeUsernameValidationRules,
  changeCountryValidationRules,
  deleteAccountValidationRules,
} from '../../middlewares/validators';
import AuthController from '../../controllers/user/AuthController';
const {
  login,
  autoLogin,
  logout,
  checkEmailExists,
  register,
  verificationStatus,
  waitingTimeResponse,
  resendRegisterToken,
  refreshToken,
  checkUsernameExists,
  changeUsername,
  changeCountry,
  changeEmail,
  deleteAccount,
  getUserData,
} = AuthController;

const router = express.Router();

router.post('/login', loginValidationRules, validate, sanitize, login);
router.post('/auto-login', sanitize, autoLogin);
router.post('/logout', sanitize, logout);
router.post('/register', registrationValidationRules, validate, sanitize, register);
router.post('/verify-status', sanitize, verificationStatus);
router.get('/waiting-time', sanitize, waitingTimeResponse);
router.post('/resend-register-token', sanitize, resendRegisterToken);
router.post('/refresh-token', sanitize, refreshToken);
router.get('/check-email/:email', sanitize, checkEmailExists);
router.get('/check-username/:username', sanitize, checkUsernameExists);
router.post('/change-email', changeEmailValidationRules, validate, sanitize, changeEmail);
router.post('/change-username', changeUsernameValidationRules, validate, sanitize, changeUsername);
router.post('/change-country', changeCountryValidationRules, validate, sanitize, changeCountry);
router.post('/delete-account', deleteAccountValidationRules, validate, sanitize, deleteAccount);
router.get('/user-data', sanitize, getUserData);

export default router;
