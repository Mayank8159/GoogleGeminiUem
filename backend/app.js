import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import authAdminRoutes from "./routes/authAdminRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => res.send("API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/admin", authAdminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/team", teamRoutes);

export default app;