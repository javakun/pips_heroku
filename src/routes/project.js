var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

//Method to populate the Project page with information from the DB
router.get('/', function(req, res) {
  var result = {};
  client.query();
  
  
});

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('page/ProjectPage.html', { sitename: 'Project' });
});

module.exports = router;
