import Event from '../models/Events.js';

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    const io = req.app.get('io');
    io.emit('newEvent', event);

    res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ eventDate: { $gte: now } }).sort({ eventDate: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCompletedEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({ eventDate: { $lt: now } }).sort({ eventDate: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};