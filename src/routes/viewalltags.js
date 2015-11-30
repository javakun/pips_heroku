var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

//Method to fill the page with tag info from DB
router.get('/', function (req, res) {
  var result = {};
  client.query("SELECT * FROM tags", selectTags)
 
  function selectTags(err, results) {
    result.tags = results.rows.map(function (tag) {
      return { 
        tag_id: tag.tag_id,
        tag_name: tag.tag_name }       
    });
    
    res.render('view/ViewAllTags.html', {
      sitename: 'Tags',
      tags: result.tags,
    });
  }
});

//Method to give ViewTagged the info of the tag we clicked
router.get('/viewTagged', function (req, res, next) { 
  var url = req.url;
  var lastWord = url.split("/viewTagged?tagButton=").join('');
  var tag_id = client.query("SELECT tag_id FROM tags WHERE tags.tag_name = $1",[lastWord]);
  
  res.render('view/ViewTagged.html', {
    sitename: 'View Tagged',
    tag_name: lastWord,
    tag_id: tag_id
  });
});

module.exports = router;