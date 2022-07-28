import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import { getSuggestions } from "../suggestions/suggestions";
import { RequestWUser } from "../types/user";

const suggestions = express.Router();

suggestions.use(getAuthUser);

suggestions.get("/me", async (req: RequestWUser, res, next) => {
  const { user } = req;

  const suggestions = await getSuggestions(user);
  res.send(suggestions);
});

export default suggestions;
