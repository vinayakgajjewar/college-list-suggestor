var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  res.render('college-info.ejs', {locals: req.body.unitId}); // Make an API call here
});

router.get('/', function(req, res) {
  res.redirect('/');
})

module.exports = router;
