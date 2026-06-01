import Event from '../models/Events.js';
import { deleteImageFromS3, getS3KeyFromUrl, uploadImageToS3 } from '../utils/s3Upload.js';

export const createEvent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const uploadedImage = await uploadImageToS3(req.file, 'events');

    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      eventDate: new Date(req.body.eventDate),
      imageUrl: uploadedImage.url,
      imageKey: uploadedImage.key,
    });

    await event.save();

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
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await deleteImageFromS3(event.imageKey || getS3KeyFromUrl(event.imageUrl));
    await Event.findByIdAndDelete(id);

    res.json({ message: 'Event deleted successfully', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};