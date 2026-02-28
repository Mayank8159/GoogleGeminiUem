import Event from '../models/Events.js';

export const createEvent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      eventDate: new Date(req.body.eventDate), // Convert string to Date object
      imageUrl: req.file.path
    });
    
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
    const events = await Event.find({ eventDate: { $gt: now } }).sort({ eventDate: 1 });
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

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const io = req.app.get('io');
    io.emit('eventDeleted', { id });

    res.json({ message: 'Event deleted successfully', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};