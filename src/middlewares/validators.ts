import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Define validation rules for registration
export const registrationValidationRules = [
  body('username').notEmpty().isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isStrongPassword(),
  body('country').notEmpty(),
];

// Define validation rules for login
export const loginValidationRules = [
  body('identifier').notEmpty(),
  body('password').isStrongPassword(),
];

// Define sanitization rules
const userSanitizationRules = [
  body('username').trim().escape(),
  body('email').normalizeEmail(),
  body('country').trim().escape(),
  body('phoneNumber').optional().trim().escape(),
  body('profilePicture').optional().trim().escape(),
  body('tags').optional().isArray(),
  body('wishlist').optional().isArray(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const sanitize = (req: Request, res: Response, next: NextFunction) => {
  userSanitizationRules.forEach((sanitizationRule) => sanitizationRule(req, res, () => {}));
  next();
};