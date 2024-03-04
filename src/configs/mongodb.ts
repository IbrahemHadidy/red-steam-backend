import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/red-steam';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection disconnected through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

export default connectToMongoDB;
