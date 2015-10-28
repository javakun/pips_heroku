var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('catalogue/CatalogueEvents', { sitename: 'Event Catalogue' });
});

module.exports = router;
