var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('catalogue/CatalogueProjects', { sitename: 'ProjectCatalogue' });
});

module.exports = router;
