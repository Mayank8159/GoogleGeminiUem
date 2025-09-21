import express from 'express';
import Message from '../models/Message.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get latest 100 messages
router.get('/', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(100);
    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;