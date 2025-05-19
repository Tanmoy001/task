const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the provided URI.
 * @param {string} uri - MongoDB connection string
 * @returns {Promise<mongoose.Connection>}
 */
module.exports = function connectDatabase(uri) {
  return mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((conn) =>
      console.log(`✔️  MongoDB connected at ${conn.connection.host}`)
    );
};