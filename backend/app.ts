import express from "express";
import dotenv from "dotenv";
import Parse from "parse/node";

// Import Routes
import auth from "./routes/auth";
import { NotFoundError } from "./utils/errors";

dotenv.config();

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JAVASCRIPT_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", auth);

app.get("/", async (req, res) => {
  const testObject = new Parse.Object("test");
  testObject.set("field1", "cool");
  const result = await testObject.save();
  res.send(result);
});

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  let { message, status } = error;
  if (!status) status = 500;
  if (!message) message = "Something went wrong in the application";

  res.status(status).send({ status, message });
});

export default app;
