var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('create/CreateEventPage', { sitename: 'Create Event' });
});

module.exports = router;
