// Import dependencies
const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Set the port from .env file
const PORT = process.env.PORT || 3000;

// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const hour = currentDate.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Within working hours, proceed
  } else {
    res.send(
      "Sorry, we are closed. Please visit us during working hours (Monday to Friday, from 9 to 17)."
    );
  }
};

// Set static folder for CSS and other static assets
app.use(express.static(__dirname)); // Serve static files from the root directory

// Apply middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/services", (req, res) => {
  res.sendFile(__dirname + "/views/services.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
