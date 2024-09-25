// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Create a variable to hold our port number
const PORT = process.env.PORT || 3000; // Consider changing to 3000

// Import the router
const router = require("./Routes/todo");

// Create the web server
const app = express();
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Add the router to the application as middleware
app.use(router);

// Start the web server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the web server for use in the application
module.exports = app;
