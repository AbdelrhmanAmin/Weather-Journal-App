// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;

const server = app.listen(port, () =>
  console.log(`yaaaahooo I am running !! on ${port}`)
);

app.get("/all", function (req, res) {
  res.send(projectData);
});

app.post("/test", function (req, res) {
  projectData["temperature"] = req.body.temperature;
  projectData["date"] = req.body.date;
  projectData["userResponse"] = req.body.userResponse;
  res.end();
  console.log(projectData);
});
