import Message from '../models/Message.js';

export const getRecentMessages = async () => {
  const messages = await Message.find().sort({ timestamp: -1 }).limit(100);
  return messages.reverse();
};

export const saveMessage = async (msg) => {
  const message = await Message.create({
    author: msg.author,
    content: msg.content,
    timestamp: new Date(),
  });

  const count = await Message.countDocuments();
  if (count > 100) {
    const excess = await Message.find().sort({ timestamp: 1 }).limit(count - 100);
    const ids = excess.map(m => m._id);
    await Message.deleteMany({ _id: { $in: ids } });
  }

  return message;
};