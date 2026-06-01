import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION;
let documentClient;

export const tableNames = {
  users: process.env.DYNAMODB_USERS_TABLE || "gemini-users",
  admins: process.env.DYNAMODB_ADMINS_TABLE || "gemini-admins",
  messages: process.env.DYNAMODB_MESSAGES_TABLE || "gemini-messages",
  events: process.env.DYNAMODB_EVENTS_TABLE || "gemini-events",
  teams: process.env.DYNAMODB_TEAMS_TABLE || "gemini-teams",
};

export const getDocumentClient = () => {
  if (!region) {
    throw new Error("AWS_REGION is required for DynamoDB access");
  }

  if (!documentClient) {
    documentClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region }), {
      marshallOptions: { removeUndefinedValues: true },
    });
  }

  return documentClient;
};

export { BatchWriteCommand, DeleteCommand, GetCommand, PutCommand, QueryCommand, ScanCommand };