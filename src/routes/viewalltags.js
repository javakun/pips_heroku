var express = require('express');
var router = express.Router();
var tagList = require('./tags.json');

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('view/ViewAllTags.html', { 
    sitename: 'Tags', 
    tagslist : tagList
    });
});

module.exports = router;