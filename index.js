var express = require("express");
var app = express();

app.use(express.static("views"));

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
  console.log("GET /");
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/student-profile", function(req, res) {
  console.log("POST /student-profile");
  console.log(req.body);

  // This is where we call the function to calculate a college list

  db.collection("student-profiles").save(req.body, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Student profile saved to db");
    }
  });
  res.redirect("/");
});
