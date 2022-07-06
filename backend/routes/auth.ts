import express from "express";

const auth = express.Router();

auth.get("/login", (req, res) => {
  res.send("Endpoint Working");
});
export default auth;
