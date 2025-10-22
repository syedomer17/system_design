import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const dbURI: string = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};