import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", async (req, res) => {
  res.status(200).send("Server Working!");
});

export default app;
