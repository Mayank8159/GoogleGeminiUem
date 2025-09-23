import { getRecentMessages, saveMessage } from '../controllers/messageController.js';

export const setupSocket = (io) => {
  io.on('connection', async (socket) => {
    console.log('🟢 User connected:', socket.id);

    // Send recent messages
    const messages = await getRecentMessages();
    socket.emit('initMessages', messages);

    // Handle new message
    socket.on('newMessage', async (msg) => {
      const saved = await saveMessage(msg);
      io.emit('messageBroadcast', saved);
    });

    // Optional: Listen for event-specific sockets
    socket.on('newEvent', (event) => {
      io.emit('eventBroadcast', event); // 👈 Real-time event push
    });

    socket.on('disconnect', () => {
      console.log('🔴 User disconnected:', socket.id);
    });
  });
};