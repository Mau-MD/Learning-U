import express from "express";
import dotenv from "dotenv";
import Parse from "parse/node";

import auth from "./src/routes/auth";
import { NotFoundError } from "./src/utils/errors";
import debug from "./src/routes/debug";
import cors from "cors";
import course from "./src/routes/course";
import resources from "./src/routes/resources";
import post from "./src/routes/post";
import follow from "./src/routes/follow";
import suggestions from "./src/routes/suggestions";
import user from "./src/routes/user";

dotenv.config();

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JAVASCRIPT_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/auth", auth);
app.use("/debug", debug);
app.use("/course", course);
app.use("/resources", resources);
app.use("/post", post);
app.use("/follow", follow);
app.use("/suggestions", suggestions);
app.use("/user", user);

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
