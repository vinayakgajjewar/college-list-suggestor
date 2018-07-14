var express = require('express');
var router = express.Router();

var api = require('../api');

router.post("/", function(req, res) {
  // Replace all instances of a space with "%20"
  var requestString = req.body.schoolName.replace(/ /g, "%20");

  api.getSearchResults(requestString, "2015", function(results) {

    var schoolNameArray = [];
    var citiesArray = [];
    var statesArray = [];
    var idArray = [];

    // Loop through the "results" array and push each school name
    for (var i = 0; i < results.length; i++) {
      schoolNameArray.push(results[i]["school.name"]);
      citiesArray.push(results[i]["school.city"]);
      statesArray.push(results[i]["school.state"]);
      idArray.push(results[i]["id"]);
    }

    var localsObj = {
      schoolNames: schoolNameArray,
      cities: citiesArray,
      states: statesArray,
      ids: idArray
    }

    res.render("college-search-results.ejs", {locals: localsObj});
  });
});

router.get('/', function(req, res) {
  res.redirect('/');
})

module.exports = router;
