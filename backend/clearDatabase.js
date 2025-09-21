import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Message from './models/Message.js';
import User from './models/User.js';

dotenv.config(); // Load MONGO_URI from .env

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gemini', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clearDatabase = async () => {
  try {
    await Message.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Messages and Users cleared');
  } catch (err) {
    console.error('❌ Error clearing database:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

clearDatabase();