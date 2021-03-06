// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express');

// Start up an instance of app
var app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=>{
// feedback to the Command Line that server runing
  console.log(`running on localhost: ${port}`)
});


// GET route
app.get('/all', function (req, res) {
  res.send(projectData);
})
// POST route
app.post('/addData', addData);

function addData(req,res){

  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    response: req.body.response
  }

  projectData=newEntry;
  console.log(projectData);
}
