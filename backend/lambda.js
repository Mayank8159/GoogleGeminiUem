import serverless from "serverless-http";

import app from "./app.js";
import connectDB from "./config/db.js";

const proxy = serverless(app);

export const handler = async (event, context) => {
  await connectDB();
  return proxy(event, context);
};
