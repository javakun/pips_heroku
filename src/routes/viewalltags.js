var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

//Method to fill the page with tag info from DB
router.get('/', function (req, res) {
  var result = {};

  client.query("SELECT * FROM tags", selectTags)

  function selectTags(err, result) {
    result.tags = result.rows.map(function (tag) {
      return { tag: tag.tag_name }
    });
  }

  if (result.rows[0]) {
    if (result.tags.length() == 0) {
      result.posts = null;
      res.render('view/ViewAllTags.html', {
        sitename: 'Tags',
        tags: result.tags
      });
    }
    else {
      res.render('view/ViewAllTags.html', {
        sitename: 'Tags',
        tags: result.tags
      });
    }
  }


});

/* GET ViewAllTags page. */
router.get('/', function (req, res, next) {
  res.render('view/ViewAllTags.html', {
    sitename: 'Tags',
  });
});

module.exports = router;