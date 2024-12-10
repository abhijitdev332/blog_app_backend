import app from './app.js'
import Database from './db/db.js'
const db = new Database();
db.connect().catch((err) => {
  console.log("db not conected", err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("server is running", PORT);
});

process.on("uncaughtException", (err) => {
  console.log("unhandle rejection", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log("unhandle", err.message);
    process.exit(1);
  });
});








