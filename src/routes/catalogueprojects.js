var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('catalogue/CatalogueProjects.html', { sitename: 'ProjectCatalogue' });
});

module.exports = router;
