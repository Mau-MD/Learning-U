import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import { getSuggestions } from "../suggestions/suggestions";
import { RequestWUser } from "../types/user";
import { BadRequestError } from "../utils/errors";

const suggestions = express.Router();

suggestions.use(getAuthUser);

suggestions.get("/me", async (req: RequestWUser, res, next) => {
  const { user } = req;

  try {
    const suggestions = await getSuggestions(user);
    res.send(suggestions);
  } catch (err) {
    next(new BadRequestError(err));
  }
});

export default suggestions;
