import dotenv from 'dotenv';
import { BatchWriteCommand, ScanCommand, getDocumentClient, tableNames } from './utils/dynamo.js';

dotenv.config();

const client = getDocumentClient();

const keyFields = {
  [tableNames.users]: ['email'],
  [tableNames.admins]: ['email'],
  [tableNames.messages]: ['conversation', 'sortKey'],
  [tableNames.events]: ['eventId'],
  [tableNames.teams]: ['teamId'],
};

const deleteAllItems = async (tableName) => {
  const keyAttributes = keyFields[tableName];
  const response = await client.send(new ScanCommand({ TableName: tableName }));
  const items = response.Items || [];

  for (let index = 0; index < items.length; index += 25) {
    const batch = items.slice(index, index + 25);
    await client.send(
      new BatchWriteCommand({
        RequestItems: {
          [tableName]: batch.map((item) => ({
            DeleteRequest: {
              Key: keyAttributes.reduce((key, field) => {
                key[field] = item[field];
                return key;
              }, {}),
            },
          })),
        },
      })
    );
  }
};

const clearDatabase = async () => {
  try {
    await deleteAllItems(tableNames.messages);
    await deleteAllItems(tableNames.events);
    await deleteAllItems(tableNames.teams);
    await deleteAllItems(tableNames.users);
    await deleteAllItems(tableNames.admins);

    console.log('✅ DynamoDB tables cleared');
  } catch (err) {
    console.error('❌ Error clearing DynamoDB tables:', err.message);
  }
};

clearDatabase();