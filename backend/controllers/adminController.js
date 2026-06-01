import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GetCommand, PutCommand, getDocumentClient, tableNames } from "../utils/dynamo.js";

const client = getDocumentClient();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await client.send(
      new GetCommand({
        TableName: tableNames.admins,
        Key: { email },
      })
    );

    const admin = response.Item;
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin.adminId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};