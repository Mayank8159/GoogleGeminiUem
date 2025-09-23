import { getRecentMessages, saveMessage } from "../controllers/messageController.js";
import jwt from "jsonwebtoken";

export const setupSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("🟢 Connected:", socket.id);

    // 🔐 Verify admin token from handshake query
    const token = socket.handshake.auth?.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.isAdmin = true;
        socket.adminId = decoded.id;
        console.log("🔐 Admin authenticated:", decoded.id);
      } catch (err) {
        console.log("⚠️ Invalid admin token");
        socket.isAdmin = false;
      }
    }

    // 📨 Send recent messages
    const messages = await getRecentMessages();
    socket.emit("initMessages", messages);

    // 💬 Handle new message
    socket.on("newMessage", async (msg) => {
      const saved = await saveMessage(msg);
      io.emit("messageBroadcast", saved);
    });

    // 📡 Admin-only event broadcast
    socket.on("newEvent", (event) => {
      if (socket.isAdmin) {
        io.emit("eventBroadcast", event);
        console.log("📢 Event broadcasted by admin");
      } else {
        console.log("⛔ Unauthorized event attempt");
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
};