import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from '../../configs/jwt';
import User from '../../models/User';
import { generateVerificationToken } from '../../utils/tokenUtils';
import { sendVerificationEmail } from '../../utils/emailUtils';

class AuthController {
  // Login function
  async login(req: Request, res: Response) {
    const { identifier, password, rememberMe } = req.body;

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

      // Create and sign JWT tokens
      const payload = { id: user._id };

      // Access token expires in 1 hour
      const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' });

      // Refresh token expires in 30 days if "rememberMe" is true, otherwise 1 hour
      const refreshTokenExpiration = rememberMe ? '30d' : '1h';
      const refreshToken = jwt.sign(payload, secret, { expiresIn: refreshTokenExpiration });

      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        country: user.country,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture && `https://drive.google.com/thumbnail?id=${user.profilePicture}`,
        tags: user.tags,
        library: user.library,
        cart: user.cart,
        wishlist: user.wishlist,
        isVerified: user.isVerified,
        isPhoneVerified: user.isPhoneVerified,
        createdAt: user.createdAt,
      };

      // Send successful login response with tokens
      res.status(200).json({ message: 'Login successful', userData, accessToken, refreshToken });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Auto Login function
  async autoLogin(req: Request, res: Response) {
    const { refreshToken } = req.body;

    try {
      // If accessToken is provided, verify it and extract user ID
      if (refreshToken) {
        try {
          const decoded = jwt.verify(refreshToken, secret);
          if (!decoded || typeof decoded !== 'object') {
            return res.status(401).json({ message: 'Invalid token' });
          }
          const userId = decoded.id;

          // Find the user by ID
          const user = await User.findById(userId);

          // If user is not found, return 401 Unauthorized
          if (!user) {
            return res.status(401).json({ message: 'User not found' });
          }

          // Create and sign new accessToken
          const payload = { id: user._id };
          const newAccessToken = jwt.sign(payload, secret, { expiresIn: '1h' });

          const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            country: user.country,
            phoneNumber: user.phoneNumber,
            profilePicture: user.profilePicture && `https://drive.google.com/thumbnail?id=${user.profilePicture}`,
            tags: user.tags,
            library: user.library,
            cart: user.cart,
            wishlist: user.wishlist,
            isVerified: user.isVerified,
            isPhoneVerified: user.isPhoneVerified,
            createdAt: user.createdAt,
          };

          // Send successful login response with new accessToken and user data
          return res.status(200).json({ message: 'Auto login successful', userData, accessToken: newAccessToken });
        } catch (err) {
          console.error('Error verifying access token:', err);
          return res.status(401).json({ message: 'Invalid access token' });
        }
      } else {
        return res.status(401).json({ message: 'Access token is required' });
      }
    } catch (error) {
      console.error('Error auto logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Logout function
  async logout(req: Request, res: Response) {
    try {
      // Extract token from request headers
      const token = req.headers.authorization?.split(' ')[1];

      // If token is not provided, return 401 Unauthorized
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      // Decode token to get user id
      const decodedToken = jwt.verify(token, secret);

      // If token is invalid, return 401 Unauthorized
      if (!decodedToken || typeof decodedToken !== 'object') {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Find user in the database
      const user = await User.findById(decodedToken.id);

      // If user is not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Set a shorter expiration time for the token during logout
      const logoutToken = jwt.sign({ id: decodedToken.id }, secret, { expiresIn: '30s' });

      // Respond with a success message and the new token with shorter expiry
      res.status(200).json({ message: 'Logout successful', token: logoutToken });
    } catch (error) {
      console.error('Error logging out user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Register function
  async register(req: Request, res: Response) {
    // Extract user input from request body
    const { username, email, password, country } = req.body;

    try {
      // Check if user with the same username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });

      if (existingUser && !existingUser.isVerified) {
        return await this.resendRegisterToken(req, res);
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
        username: username,
        email: email,
        password: hashedPassword,
        country,
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

      // Send successful registration response with token
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Waiting time response
  async waitingTimeResponse(_req: Request, res: Response) {
    const waitingTime = 20 * 60 * 1000;
    return res.status(200).json({ waitingTime });
  }

  // Verification function
  async verificationStatus(req: Request, res: Response) {
    try {
      const { identifier } = req.body;

      // Find user by identifier
      const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if user is verified
      if (user.isVerified) {
        return res.status(200).json({ verified: true, message: 'User verified' });
      }

      // If user is not verified, return 200 OK
      return res.status(200).json({ verified: false, message: 'User not verified' });
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  }

  // Resend verification token
  async resendRegisterToken(req: Request, res: Response) {
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

  // refresh token
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      // Check if refresh token is provided
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }

      // Verify the provided refresh token
      const decodedToken = jwt.verify(refreshToken, secret);

      // If refresh token is invalid, return an error
      if (!decodedToken || typeof decodedToken !== 'object') {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // If refresh token is expired, prompt the user to log in again
      if (decodedToken.exp === undefined) {
        return res.status(401).json({ message: 'Invalid token: Expiration time is missing' });
      }
      if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
        return res.status(401).json({ message: 'Refresh token has expired. Please log in again' });
      }

      // Generate a new access token with the same payload and refresh it
      const { id } = decodedToken;

      const newAccessToken = jwt.sign({ id }, secret, { expiresIn: '1h' });

      // Generate a new refresh token and invalidate the old one (rotate tokens)
      const newRefreshToken = jwt.sign({ id }, secret, { expiresIn: '30d' });

      // Send the new tokens as a response
      return res
        .status(200)
        .json({ message: 'Tokens refreshed successfully', accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
      console.error('Error refreshing token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Check existing email
  async checkEmailExists(req: Request, res: Response) {
    const { email } = req.params;

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(200).json({ exists: true, message: 'Email already exists' });
      }

      res.status(200).json({ exists: false, message: 'Email available' });
    } catch (error) {
      console.error('Error checking email:', error);
    }
  }

  // Check if username exists
  async checkUsernameExists(req: Request, res: Response) {
    try {
      const { username } = req.params;

      // Query the database to check if the username exists
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        // Username exists
        return res.status(200).json({ exists: true, message: 'Username already taken' });
      } else {
        // Username doesn't exist
        return res.status(200).json({ exists: false, message: 'Username available' });
      }
    } catch (error) {
      console.error('Error checking username:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Change username
  async changeUsername(req: Request, res: Response) {
    // Extract user input from request body
    const { userId, newUsername, password } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      // If user is not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      // If old password doesn't match, return 401 Unauthorized
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Check if new username is the same as the old one
      if (newUsername === user.username) {
        return res.status(409).json({ message: 'New username must be different' });
      }

      // Check if username is already taken
      const existingUser = await User.findOne({ username: newUsername });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already taken' });
      }

      // Update user's password with the new hashed password
      user.username = newUsername;
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Username changed successfully' });
    } catch (error) {
      console.error('Error changing username:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Change email
  async changeEmail(req: Request, res: Response) {
    // Extract user input from request body
    const { userId, newEmail, password } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      // If user is not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      // If old password doesn't match, return 401 Unauthorized
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Check if new email is the same as the old one
      if (newEmail === user.email) {
        return res.status(409).json({ message: 'New email must be different' });
      }

      // Check if email is already taken
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already taken' });
      }

      // Update user's email with the new email
      user.email = newEmail;
      user.isVerified = false;
      await user.save();

      // Generate a new verification token
      const newVerificationToken = generateVerificationToken();

      // Send verification email
      await sendVerificationEmail(newEmail, newVerificationToken);

      // Return success response
      res.status(200).json({ message: 'Email changed successfully, verification email sent' });
    } catch (error) {
      console.error('Error changing email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Change country
  async changeCountry(req: Request, res: Response) {
    // Extract user input from request body
    const { userId, newCountry } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      // If user is not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if new country is the same as the old one
      if (newCountry === user.country) {
        return res.status(409).json({ message: 'New country must be different' });
      }

      // Update user's country
      user.country = newCountry;
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Country changed successfully' });
    } catch (error) {
      console.error('Error changing country:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete account
  async deleteAccount(req: Request, res: Response) {
    // Extract user input from request body
    const { userId, password } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      // If user is not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      // If old password doesn't match, return 401 Unauthorized
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Delete user
      await User.findByIdAndDelete(userId);

      // Return success response
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserData(req: Request, res: Response) {
    try {
      // Get the authorization header
      const authHeader = req.headers['authorization'];

      if (authHeader) {
        // Split the header into two parts: Bearer and the token
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(token, secret);

        // If token is invalid, return 401 Unauthorized
        if (!decodedToken || typeof decodedToken !== 'object') {
          return res.status(401).json({ message: 'Invalid token' });
        }

        // Token verification successful, extract user ID
        const { id } = decodedToken;

        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const userData = {
          _id: user._id,
          username: user.username,
          email: user.email,
          country: user.country,
          phoneNumber: user.phoneNumber,
          profilePicture: user.profilePicture && `https://drive.google.com/thumbnail?id=${user.profilePicture}`,
          tags: user.tags,
          library: user.library,
          cart: user.cart,
          wishlist: user.wishlist,
          isVerified: user.isVerified,
          isPhoneVerified: user.isPhoneVerified,
          createdAt: user.createdAt,
        };

        // Return the user data
        res.status(200).json(userData);
      } else {
        // No authorization header provided
        return res.status(401).json({ message: 'Authorization header is missing' });
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new AuthController();
