const path           = require("path");
const dotenv         = require("dotenv");
const app            = require("./app");
const connectDatabase = require("./config/database");


const envFile = path.resolve(__dirname, "config", "config.env");
const result  = dotenv.config({ path: envFile });
if (result.error) {
  console.error("dotenv failed to load:", result.error);
  process.exit(1);
}


const PORT   = result.parsed.PORT || 4000;
const DB_URL = result.parsed.DB_URL;
if (!DB_URL) {
  console.error("Missing DB_URL in .env!");
  process.exit(1);
}


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server?.close(() => process.exit(1));
});


connectDatabase(DB_URL).then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
