const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


const userRoute = require("./routes/userRoute"); // Corrected variable name
app.use("/api", userRoute);  // Corrected usage of the route

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
