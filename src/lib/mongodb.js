import mongoose from 'mongoose';

const ConnectMongoDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error('Error Connecting mongodb');
  }
};

export default ConnectMongoDB;
