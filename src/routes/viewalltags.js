var express = require('express');
var router = express.Router();
var tags = require('./tags.json')


/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('view/ViewAllTags', { sitename: 'Tags' , tagList : tags});
});

module.exports = router;