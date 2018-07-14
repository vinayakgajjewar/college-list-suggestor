var express = require('express');
var router = express.Router();
var api = require('../api');

router.post('/', function(req, res) {
  api.getCollegeInfo(req.body.unitId, '2015', function(results) {
    console.log(results);
    res.render('college-info.ejs', {locals: results[0]});
  });
  // res.render('college-info.ejs', {locals: req.body.unitId}); // Make an API call here
});

router.get('/', function(req, res) {
  res.redirect('/');
})

module.exports = router;
