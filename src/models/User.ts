import mongoose, { Document } from 'mongoose';

// Define the user document interface
export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  country: string;
  phoneNumber?: string;
  profilePicture?: string;
  tags: string[];
  library: string[];
  cart: string[];
  wishlist: {
    item: string;
    addedOn: Date;
  }[];
  verificationToken?: string;
  isVerified: boolean;
  phoneVerificationCode?: string;
  isPhoneVerified?: boolean;
  createdAt: Date;
}

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  tags: {
    type: Array,
    default: [],
    required: true,
  },
  library: {
    type: Array,
    default: [],
    required: true,
  },
  cart: {
    type: Array,
    default: [],
    required: true,
  },
  wishlist: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      addedOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  verificationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerificationCode: {
    type: String,
  },
  isPhoneVerified: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User model
const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
