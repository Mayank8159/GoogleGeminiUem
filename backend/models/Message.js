import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  author: String,
  content: String,
  timestamp: Date,
});

export default mongoose.model('Message', messageSchema);