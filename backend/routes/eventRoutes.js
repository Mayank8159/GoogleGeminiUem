import express from 'express';
import multer from 'multer';
import {
  createEvent,
  getUpcomingEvents,
  getCompletedEvents,
  deleteEvent
} from '../controllers/eventController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Routes
// Admin creates an event (with image)
router.post('/admin/events', verifyAdmin, upload.single('image'), createEvent);

// Admin deletes an event
router.delete('/admin/events/:id', verifyAdmin, deleteEvent);

// Get events
router.get('/upcoming', getUpcomingEvents);
router.get('/completed', getCompletedEvents);

export default router;
