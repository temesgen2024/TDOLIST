const bodyParser = require("body-parser");
//  Import the express module 

const express = require("express");
// Import the dotenv module and call the config method to load the environment variables
require("dotenv").config();
// Create a variable to hold our port number
const PORT = process.env.PORT || 800;
// import the router
const router = require("./Routes/todo");
// Create the webserver 
const app = express();
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Add the router to the application as middleware
app.use(router);
// start the webserver
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// export the webserver for use in the application
module.exports = app;