import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  eventDate: { type: Date, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;