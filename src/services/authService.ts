import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import secret from '../configs/jwt';

export async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
  return token;
}
