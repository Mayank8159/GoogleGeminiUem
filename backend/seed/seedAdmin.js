import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { GetCommand, PutCommand, getDocumentClient, tableNames } from "../utils/dynamo.js";

dotenv.config();

const client = getDocumentClient();

const seedAdmin = async () => {
  const email = "admin@gemini.ggsc";
  const plainPassword = "SuperSecurePassword123";

  const existing = await client.send(
    new GetCommand({
      TableName: tableNames.admins,
      Key: { email },
    })
  );

  if (existing.Item) {
    console.log("Admin already exists.");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  const admin = {
    email,
    adminId: randomUUID(),
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  await client.send(
    new PutCommand({
      TableName: tableNames.admins,
      Item: admin,
    })
  );

  console.log("✅ Admin seeded successfully.");
  process.exit();
};

seedAdmin();