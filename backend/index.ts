import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🚀 Server started on localhost:3001");
});
