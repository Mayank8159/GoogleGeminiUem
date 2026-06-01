import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GetCommand, PutCommand, getDocumentClient, tableNames } from '../utils/dynamo.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const client = getDocumentClient();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await client.send(
      new GetCommand({
        TableName: tableNames.users,
        Key: { email },
      })
    );

    if (existing.Item) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = {
      email,
      userId: randomUUID(),
      name,
      password: hashed,
      createdAt: new Date().toISOString(),
    };

    await client.send(
      new PutCommand({
        TableName: tableNames.users,
        Item: user,
      })
    );

    const token = jwt.sign({ id: user.userId }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await client.send(
      new GetCommand({
        TableName: tableNames.users,
        Key: { email },
      })
    );

    const user = response.Item;
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.userId }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};