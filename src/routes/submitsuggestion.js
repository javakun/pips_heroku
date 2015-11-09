var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('submit/SubmitSuggestions', { sitename: 'Submit Suggestion' });
});

module.exports = router;
