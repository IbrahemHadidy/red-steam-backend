import mongoose, { Document, Schema } from 'mongoose';

// Define the blacklisted token document interface
export interface BlacklistedTokenDocument extends Document {
  token: string;
  createdAt: Date;
}

// Define the blacklisted token schema
export const blacklistedTokenSchema = new Schema<BlacklistedTokenDocument>({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '1d' }, // Automatically expire tokens after 1 day
});

// Function to add a token to the blacklist
export async function blacklistToken(token: string) {
  try {
    // Create a new document with the token
    await BlacklistedToken.create({ token });
  } catch (error) {
    console.error('Error blacklisting token:', error);
    throw error;
  }
}

// Function to check if a token is blacklisted
export async function isTokenBlacklisted(token: string): Promise<boolean> {
  try {
    // Query the MongoDB collection to check if the token exists
    const blacklistedToken: BlacklistedTokenDocument | null = await BlacklistedToken.findOne({ token });
    return !!blacklistedToken; // Return true if the token exists in the blacklist
  } catch (error) {
    console.error('Error checking token blacklist:', error);
    throw error;
  }
}

// Create a Mongoose model for blacklisted tokens
const BlacklistedToken = mongoose.model<BlacklistedTokenDocument>('BlacklistedToken', blacklistedTokenSchema);
export default BlacklistedToken;