import { randomUUID } from 'crypto';
import { deleteImageFromS3, getS3KeyFromUrl, uploadImageToS3 } from '../utils/s3Upload.js';
import { DeleteCommand, GetCommand, PutCommand, ScanCommand, getDocumentClient, tableNames } from '../utils/dynamo.js';

const client = getDocumentClient();

const normalizeEvent = (event) => ({
  ...event,
  _id: event._id || event.eventId,
});

const sortByEventDateAsc = (left, right) => new Date(left.eventDate).getTime() - new Date(right.eventDate).getTime();
const sortByEventDateDesc = (left, right) => new Date(right.eventDate).getTime() - new Date(left.eventDate).getTime();

export const createEvent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const uploadedImage = await uploadImageToS3(req.file, 'events');
    const eventId = randomUUID();
    const event = normalizeEvent({
      eventId,
      _id: eventId,
      title: req.body.title,
      description: req.body.description,
      eventDate: new Date(req.body.eventDate).toISOString(),
      imageUrl: uploadedImage.url,
      imageKey: uploadedImage.key,
      createdAt: new Date().toISOString(),
    });

    await client.send(
      new PutCommand({
        TableName: tableNames.events,
        Item: event,
      })
    );

    res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const response = await client.send(
      new ScanCommand({
        TableName: tableNames.events,
      })
    );

    const events = (response.Items || [])
      .filter((event) => new Date(event.eventDate).getTime() > now.getTime())
      .map(normalizeEvent)
      .sort(sortByEventDateAsc);

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCompletedEvents = async (req, res) => {
  try {
    const now = new Date();
    const response = await client.send(
      new ScanCommand({
        TableName: tableNames.events,
      })
    );

    const events = (response.Items || [])
      .filter((event) => new Date(event.eventDate).getTime() < now.getTime())
      .map(normalizeEvent)
      .sort(sortByEventDateDesc);

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await client.send(
      new GetCommand({
        TableName: tableNames.events,
        Key: { eventId: id },
      })
    );

    const event = response.Item;

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await deleteImageFromS3(event.imageKey || getS3KeyFromUrl(event.imageUrl));
    await client.send(
      new DeleteCommand({
        TableName: tableNames.events,
        Key: { eventId: id },
      })
    );

    res.json({ message: 'Event deleted successfully', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};