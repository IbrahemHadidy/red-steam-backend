import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../configs/jwt';
import User from '../models/User';
import { blacklistToken, isTokenBlacklisted } from '../models/BlacklistedToken';
import { generateVerificationToken } from '../utils/tokenUtils';
import { sendVerificationEmail } from '../utils/emailUtils';

// Login function
export const login = async (req: Request, res: Response) => {
  // Validate and sanitize user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { identifier, password } = req.body;

  try {
    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    // If user is not found, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    // Compare password hashes
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return 401 Unauthorized
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    // Check if user's token is blacklisted
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (token && await isTokenBlacklisted(token)) {
      return res.status(401).json({ message: 'Session expired. Please log in again' });
    }

    // Create and sign JWT token
    const payload = { id: user._id };
    const jwtToken = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Send successful login response with token
    res.status(200).json({ message: 'Login successful', jwtToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Logout function
export const logout = async (req: Request, res: Response) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization?.split(' ')[1];

    // If token is not provided, return 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Decode token to get user id
    const decodedToken = jwt.verify(token, secret) as { id: string };

    // Find user in the database
    const user = await User.findById(decodedToken.id);

    // If user is not found, return 404 Not Found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add token to blacklist or perform other cleanup tasks
    await blacklistToken(token);

    // Set a shorter expiration time for the token during logout
    const logoutToken = jwt.sign({ id: decodedToken.id }, secret, { expiresIn: '5m' });

    // Respond with a success message and the new token with shorter expiry
    res.status(200).json({ message: 'Logout successful', token: logoutToken });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Register function
export const register = async (req: Request, res: Response) => {
  // Validate and sanitize user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user input from request body
  const { username, email, password, country} = req.body;

  try {
    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    
    if (existingUser && !existingUser.isVerified) {
      return await resendRegisterToken(req, res);
    }
    if (existingUser && existingUser.isVerified) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Generate a verification token
    const verificationToken = generateVerificationToken();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      country,
      tags: [],
      verificationToken,
      isVerified: false,
    });

    // Save the user document to the database
    await newUser.save();
    
    // Send verification email
    if (newUser.verificationToken) {
      await sendVerificationEmail(newUser.email, newUser.verificationToken);
    } else {
      console.error('Verification token is undefined');
    }

    // Create JWT payload
    const payload = { id: newUser._id };

    // Sign JWT token with expiration time
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Send successful registration response with token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resendRegisterToken = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is verified
    if (user.isVerified) {
      return res.status(409).json({ message: 'User already verified' });
    }

    // Generate a new verification token
    const newVerificationToken = generateVerificationToken();

    // Update user document with the new verification token
    await user.updateOne({ verificationToken: newVerificationToken });

    // Resend verification email with the new token
    await sendVerificationEmail(email, newVerificationToken);

    res.status(200).json({ message: 'Verification token resent successfully' });
  } catch (error) {
    console.error('Error resending verification token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
