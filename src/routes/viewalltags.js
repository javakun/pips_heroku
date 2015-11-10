var express = require('express');
var router = express.Router();
var tagList = require('./json/tags.json');

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('view/ViewAllTags', { 
    sitename: 'Tags', 
    tags : tagList
    });
});

module.exports = router;