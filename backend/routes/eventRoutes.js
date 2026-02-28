import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createEvent,
  getUpcomingEvents,
  getCompletedEvents
} from '../controllers/eventController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
// Admin creates an event (with image)
router.post('/admin/events', verifyAdmin, upload.single('image'), createEvent);

// Get events
router.get('/upcoming', getUpcomingEvents);
router.get('/completed', getCompletedEvents);

export default router;
