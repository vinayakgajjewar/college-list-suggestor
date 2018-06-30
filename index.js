// TODO: Split this up into multiple files

var express = require("express");
var app = express();

app.use(express.static("views"));

// Set the templating engine
app.set("view engine", "ejs");

var api = require("./api");

var collegelist = require("./collegelist");

// For reading data from the form element
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var port = 3000;

var dbURI = "mongodb://college-search-client:college-search-client-1@ds018508.mlab.com:18508/college-search-db";
var db;

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect(dbURI, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");

    db = client.db("college-search-db");
    app.listen(port, function() {
      console.log("Listening at localhost:" + port);
    });
  }

});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/student-profile", function(req, res) {
  console.log("POST /student-profile");

  console.log(req.body);

  // TODO: Make sure the GPA and SAT score are numbers before passing them as
  // arguments
  console.log(collegelist.createCollegeList(parseInt(req.body.gpa), parseInt(req.body.satScore)));
  // res.send(collegelist.createCollegeList(parseInt(req.body.gpa), parseInt(req.body.satScore)));

  db.collection("student-profiles").save(req.body, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Student profile saved to db");
    }
  });
  res.redirect("/");
});

// Redirect to /
app.get("/search", function(req, res) {
  res.redirect("/");
});

app.post("/search", function(req, res) {
  console.log("POST /search");

  // Replace all instances of a space with "%20"
  var requestString = req.body.schoolName.replace(/ /g, "%20");

  api.makeAPICall(requestString, "2015", function(results) {

    var schoolNameArray = [];
    var admissionRatesArray = [];

    // Loop through the "results" array and push each school name
    for (var i = 0; i < results.length; i++) {
      schoolNameArray.push(results[i]["school.name"]);
    }
    for (var i = 0; i < results.length; i++) {
      admissionRatesArray.push(results[i]["2015.admissions.admission_rate.overall"])
    }

    var localsObj = {
      schoolNames: schoolNameArray,
      admissionRates: admissionRatesArray
    }

    // Contains all the names of the colleges separated by commas
    var collegeResultsString = schoolNameArray.toString();
    res.render("college-search-results.ejs", {locals: localsObj}); // Change this
  });
});

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + "/views/404.html")
});
