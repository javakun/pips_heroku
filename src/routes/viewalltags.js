var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

//Method to fill the page with tag info from DB
router.get('/', function (req, res) {
  var result = {};
  
  client.query("SELECT * FROM notifications WHERE notifications.user_id = $1",
    [req.session.user.id],
    selectNotifications);


  function selectNotifications(err, results) {
    result.notifications = results.rows.map(function (notification) {
      return {
        id: notification.noti_id,
        description: notification.noti_description,
        title: notification.noti_title,
        link: notification.noti_link
      }
    });
    
  client.query("SELECT * FROM tags", selectTags);
  }

 
  function selectTags(err, results) {
    result.tags = results.rows.map(function (tag) {
      return { 
        tag_id: tag.tag_id,
        tag_name: tag.tag_name }   
        
        client.query("SELECT * FROM profile WHERE profile.profile_id = $1",
      [req.session.user.id], displayData);    
    });
  }
  function displayData(err, results) {    
    res.render('view/ViewAllTags.html', {
      
      tags: result.tags,
      pagename: 'PIPS - Submit Suggestion',
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      user_email: req.session.user.user_email
  
    });
  }
});
 

  

//Method to give ViewTagged the info of the tag we clicked
router.get('/viewTagged', function (req, res, next) { 
  //var url = req.url;
  //console.log(url)
  var result = {}
  var lastWord = req.query.tagButton; //url.split("/viewTagged?tagButton=").join('');
  console.log(lastWord);
  var tag_id = client.query("SELECT tag_id FROM tags WHERE tags.tag_name = $1",[lastWord]);
  
 
  
  client.query("SELECT project_id, project_name FROM project WHERE project.tag_id = $1",[lastWord]);
  
  function selectProjects(err, results) {
    result.projects = results.rows.map(function(project) {
      return{
        p_id: project.project_id,
        p_name: project.project_name
      }
    });
    client.query("SELECT group_id, group_name FROM groups WHERE groups.tag_id = $1", [lastWord], selectGroups);
  }
  function selectGroups(err, results) {
    result.notifications = results.rows.map(function(group) {
      return{
        g_id: group.group_id,
        g_name: group.group_name
      }
    });
    client.query("SELECT event_id, group_id FROM event WHERE event.tag_id = $1", [lastWord], displayData); 
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