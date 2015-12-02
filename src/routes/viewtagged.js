var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

//Method to give ViewTagged the info of the tag we clicked
router.get('/', function (req, res, next) { 
  //var url = req.url;
  //console.log(url)
  var result = {}
  var tag_id;
  var lastWord = []
  lastWord[0] = req.query.tagButton; //url.split("/viewTagged?tagButton=").join('');
  console.log(lastWord);

  client.query("SELECT tag_id FROM tags WHERE tags.tag_name = $1", [lastWord[0]], selectTag);

  function selectTag(err, results) {
    tag_id= results.rows[0].tag_id;

    client.query("SELECT * FROM project WHERE project.tag_id @> '{"+ tag_id +"}'::int[]",selectProjects);
  }
  function selectProjects(err, results) {
    result.projects = results.rows.map(function (project) {
      return {
        p_id: project.project_id,
        p_name: project.project_name
      }
    });
    client.query("SELECT * FROM groups WHERE groups.tag_id @> '{"+ tag_id +"}'::int[]",selectGroups);
  }
  function selectGroups(err, results) {
    result.group = results.rows.map(function (group) {
      return {
        g_id: group.group_id,
        g_name: group.group_name
      }
    });
    client.query("SELECT * FROM event WHERE event.tag_list @> '{"+ tag_id +"}'::int[]",selectEvent);
  }
  function selectEvent(err, results) {
    result.event = results.rows.map(function (event) {
      return {
        e_id: event.event_id,
        e_name: event.event_name
      }
    });
    client.query("SELECT * FROM notifications WHERE notifications.user_id = $1",
      [req.session.user.id],
      selectNotifications);
  }

  function selectNotifications(err, results) {
    result.notifications = results.rows.map(function (notification) {
      return {
        id: notification.noti_id,
        description: notification.noti_description,
        title: notification.noti_title,
        link: notification.noti_link
      }
    });

    client.query("SELECT * FROM profile WHERE profile.profile_id = $1",
      [req.session.user.id], displayData);
  }

  function displayData(err, results) {
    res.render('view/ViewTagged.html', {
      pagename: 'PIPS - View All Tags',
      tag_name: lastWord[0],
      tag_id: tag_id,
      project: result.project,
      group: result.group,
      event: result.event,
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      user_email: req.session.user.user_email
    });
  }
});

module.exports = router;
