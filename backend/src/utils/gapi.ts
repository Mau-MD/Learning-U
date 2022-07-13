import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const youtube = google.youtube({ version: "v3", auth: process.env.GAPI_KEY });

export default youtube;
