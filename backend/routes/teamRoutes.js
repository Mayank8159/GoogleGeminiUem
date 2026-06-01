import express from "express";
import multer from "multer";
import { addTeamMember, getTeamMembers } from "../controllers/teamController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Routes
router.post("/", upload.single("image"), addTeamMember);
router.get("/", getTeamMembers);

export default router;
