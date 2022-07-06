import express from "express";
import dotenv from "dotenv";
import Parse from "parse/node";
dotenv.config();

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JAVASCRIPT_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

const app = express();

app.get("/", async (req, res) => {
  const testObject = new Parse.Object("test");
  testObject.set("field1", "cool");
  const result = await testObject.save();
  res.send(result);
});

export default app;
