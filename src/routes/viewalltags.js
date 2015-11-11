var express = require('express');
var router = express.Router();
var tags = require('./public/json/tags.json');

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('view/ViewAllTags', { 
    sitename: 'Tags', 
    tags : 'tagList'
    });
});

module.exports = router;