import express from "express";
import multer from "multer";
import path from "path";
import { addTeamMember, getTeamMembers } from "../controllers/teamController.js";

const router = express.Router();

// Image upload config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), addTeamMember);
router.get("/", getTeamMembers);

export default router;
