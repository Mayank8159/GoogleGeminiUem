import { getRecentMessages, saveMessage } from '../controllers/messageController.js';

export const setupSocket = (io) => {
  io.on('connection', async (socket) => {
    console.log('User connected:', socket.id);

    const messages = await getRecentMessages();
    socket.emit('initMessages', messages);

    socket.on('newMessage', async (msg) => {
      const saved = await saveMessage(msg);
      io.emit('messageBroadcast', saved);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};