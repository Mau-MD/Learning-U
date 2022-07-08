import { google } from "googleapis";

const youtube = google.youtube({ version: "v3", auth: process.env.GAPI_KEY });

export default youtube;
