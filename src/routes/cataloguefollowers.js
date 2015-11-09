var express = require('express');
var router = express.Router();

/* GET Followers page. */
router.get('/', function(req, res, next) {
  res.render('catalogue/CatalogueFollowers', { sitename: 'Followers' });
});

module.exports = router;
