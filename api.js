// TODO: Figure out how to hide the API key
// So it's not visible by looking at the source code
var request = require("request");

// Make the function available outside this file
exports.makeAPICall = function(schoolName, year, then) {
  // "then" is the callback function to execute after fetching the data
  // We'll feed that function the results
  // This is to make sure that any code that tries to use the results are only
  // able to access it after the results have actually been fetched

  var apiKey = "m47uZ5ouIEVWso3e2SOv4Jhv2clpeEEoggaigffk";

  var url = "https://api.data.gov/ed/collegescorecard/v1/schools?school.name=";

  // Append the API key to the URL
  var fullURL = url + schoolName + "&fields=school.name," + year + ".admissions.admission_rate.overall" + "&api_key=" + apiKey;

  request(fullURL, function(error, response, body) {
    if (error) {
      console.log(error);
    }

    // var admitRate = JSON.parse(body).results[0]["2015.admissions.admission_rate.overall"];
    // console.log("results: " + results);

    var results = JSON.parse(body).results;
    then(results);
  });
}
