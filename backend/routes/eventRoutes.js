import express from 'express';
import {
  createEvent,
  getUpcomingEvents,
  getCompletedEvents
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/admin/events', createEvent);
router.get('/events/upcoming', getUpcomingEvents);
router.get('/events/completed', getCompletedEvents);

export default router;