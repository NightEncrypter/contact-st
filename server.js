// REACT uses ES5 or ES6  module for import syntax
// We can't use import syntax
const express = require("express");

// import connectDB file
const connectDB = require("./config/db");

const path = require("path");

// Initialize
const app = express();

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("startrack/build"));

  app.get("*", (req, res) =>res.sendFile(path.resolve(__dirname, "startrack", "build", "index.html")) );
}

// production var
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
