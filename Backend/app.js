const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ Import CORS

// ✅ Use CORS middleware
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true               // allow cookies if using them
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", require("./routes/userRoute"));

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
