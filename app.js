// TODO: Split this up into multiple files

var express = require("express");
var app = express();

app.use(express.static("views"));

var config = require('./config.json');
var port = config.port;
var dbURI = config.dbURI;

// Set the templating engine
app.set("view engine", "ejs");

var api = require("./api");

var collegelist = require("./collegelist");

var indexRouter = require('./routes/index');
var searchResultsRouter = require('./routes/college-search-results');
var collegeInfoRouter = require('./routes/college-info');
var aboutPageRouter = require('./routes/about');

// For reading data from the form element
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

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

app.use('/', indexRouter);
app.use('/about', aboutPageRouter);
app.use('/search', searchResultsRouter);
app.use('/learn-more', collegeInfoRouter);

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

app.use(function(req, res) {
  res.status(404).sendFile(__dirname + "/views/404.html")
});
