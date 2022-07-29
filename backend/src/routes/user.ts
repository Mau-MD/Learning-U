import express from "express";
import { getAuthUser } from "../middleware/getAuthUser";
import { RequestWUser } from "../types/user";

const user = express.Router();

user.use(getAuthUser);

export default user;
