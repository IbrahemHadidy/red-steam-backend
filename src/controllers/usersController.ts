import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User, { UserDocument } from '../models/User';

const handleSuccess = (res: Response, data: UserDocument[] | { message: string }, status = 200) => {
  res.status(status).json(data);
};

const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  } else {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const userController = {
  getAllUsers: async (_req: Request, res: Response) => {
    try {
      const users: UserDocument[] = await User.find(); // Specify type for returned array
      handleSuccess(res, users);
    } catch (error) {
      handleError(error, res);
    }
  },

  createUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      handleSuccess(res, { message: 'User created successfully' }, 201); // Use 201 for created
    } catch (error) {
      handleError(error, res);
    }
  },

  getUserByIdentifier: async (req: Request, res: Response) => {
    const { identifier } = req.params;

    try {
      // Query the database for the user using both email and username
      const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Avoid sensitive information from being sent to the client when viewing other's profiles
  getUserProfile: async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
      // Query the database for the user using both email and username
      const user = await User.findOne(
        { username },
        { username: 1, avatar: 1, country: 1 }, // Projection to select specific fields
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateUserByIdentifier: async (req: Request, res: Response) => {
    const { identifier } = req.params; // The identifier could be email or username
    const updates = req.body;

    try {
      // Find the user by the identifier (email or username)
      const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user object with the provided updates
      Object.assign(user, updates);
      await user.save();

      // Return success response
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteUserByIdentifier: async (req: Request, res: Response) => {
    const { identifier } = req.params; // The identifier could be email or username

    try {
      // Find the user by the identifier (email or username)
      const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the user object
      await user.deleteOne();

      // Return success response
      res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default userController;
