// TODO: Figure out how to hide the API key
// So it's not visible by looking at the source code
var request = require("request");

var config = require('./config.json');

// Make the function available outside this file
exports.getSearchResults = function(schoolName, year, then) {
  // "then" is the callback function to execute after fetching the data
  // We'll feed that function the results
  // This is to make sure that any code that tries to use the results are only
  // able to access it after the results have actually been fetched

  var apiKey = config.apiKey;

  var url = "https://api.data.gov/ed/collegescorecard/v1/schools";

  // Append the API key to the URL
  var fullURL = url +  "?school.name=" + schoolName + "&fields=id,school.name,school.city,school.state" + "&api_key=" + apiKey;

  request(fullURL, function(error, response, body) {
    if (error) {
      console.log(error);
    }

    // var admitRate = JSON.parse(body).results[0]["2015.admissions.admission_rate.overall"];
    // console.log("results: " + results);

    var results = JSON.parse(body).results;
    then(results);
  });
};

exports.getCollegeInfo = function(unitId, year, then) {
  var apiKey = config.apiKey;
  var url = 'https://api.data.gov/ed/collegescorecard/v1/schools';
  var fullURL = url + '?id=' + unitId + '&fields=school.name,school.city,school.state,school.school_url,school.price_calculator_url,2015.admissions.admission_rate.overall,2015.admissions.sat_scores.average.overall,2015.admissions.act_scores.midpoint.cumulative,2015.student.size,2015.cost.tuition.in_state,2015.cost.tuition.out_of_state,2015.aid.median_debt.completers.overall,2015.student.demographics.female_share,2015.student.retention_rate.four_year.full_time_pooled' + '&api_key=' + apiKey;

  request(fullURL, function(error, response, body) {
    if (error) {
      console.log(error);
    }

    var results = JSON.parse(body).results;
    console.log(results);
    then(results);
  });
}
