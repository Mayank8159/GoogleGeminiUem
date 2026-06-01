import mongoose from 'mongoose';

let connectionPromise;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (!connectionPromise) {
      connectionPromise = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gemini');
    }

    const connection = await connectionPromise;
    console.log('✅ MongoDB connected');
    return connection;
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    connectionPromise = undefined;
    throw err;
  }
};

export default connectDB;