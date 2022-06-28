import app from "./app";
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🚀 Server started on localhost:3001")
})