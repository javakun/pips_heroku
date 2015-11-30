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
      //profile_name: username
    });
  }
});

//Method to give ViewTagged the info of the tag we clicked
router.get('/viewTagged', function (req, res, next) { 
  var url = req.url;
  console.log(url)
  var lastWord = url.split("/viewTagged?tagButton=").join('');
  console.log(lastWord);
  var tag_id = client.query("SELECT tag_id FROM tags WHERE tags.tag_name = $1",[lastWord]);
  
  var result = {}
  
  client.query("SELECT project_id, project_name FROM project WHERE tag_id = $1",[lastWord]);
  
  function selectProjects(err, results) {
    result.projects = results.rows.map(function(project) {
      return{
        p_id: project.project_id,
        p_name: project.project_name
      }
    });
    client.query("SELECT group_id, group_name FROM groups WHERE tag_id = $1", [lastWord], selectGroups);
  }
  function selectGroups(err, results) {
    result.notifications = results.rows.map(function(group) {
      return{
        g_id: group.group_id,
        g_name: group.group_name
      }
    });
    client.query("SELECT event_id, group_id FROM event WHERE tag_id = $1", [lastWord], displayData); 
  }
  function displayData(err, results) {
     res.render('view/ViewTagged.html', {
    sitename: 'View Tagged',
    tag_name: lastWord,
    tag_id: tag_id,
    project_id: result.rows.project_id,
    project_name: result.rows.project_name,
    group_id: result.rows.group_id,
    group_name: result.rows.group_name,
    event_id: result.rows.event_id,
    event_name: result.rows.event_name
  }); 
  }
});

module.exports = router;