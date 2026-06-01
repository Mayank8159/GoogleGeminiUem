import { randomUUID } from 'crypto';
import { PutCommand, QueryCommand, getDocumentClient, tableNames } from '../utils/dynamo.js';

const client = getDocumentClient();
const CONVERSATION_ID = 'GLOBAL';

export const getRecentMessages = async () => {
  const response = await client.send(
    new QueryCommand({
      TableName: tableNames.messages,
      KeyConditionExpression: 'conversation = :conversation',
      ExpressionAttributeValues: {
        ':conversation': CONVERSATION_ID,
      },
      ScanIndexForward: false,
      Limit: 100,
    })
  );

  return (response.Items || []).reverse();
};

export const saveMessage = async (msg) => {
  const timestamp = new Date().toISOString();
  const message = {
    messageId: randomUUID(),
    _id: randomUUID(),
    conversation: CONVERSATION_ID,
    author: msg.author,
    content: msg.content,
    timestamp,
    sortKey: `${timestamp}#${randomUUID()}`,
  };

  await client.send(
    new PutCommand({
      TableName: tableNames.messages,
      Item: message,
    })
  );

  return message;
};

export const createMessage = async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const message = await saveMessage({
      author: author || 'Anonymous',
      content: content.trim(),
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};