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
        tag_name: tag.tag_name
      }
    });
    client.query("SELECT * FROM profile WHERE profile.profile_id = $1",
      [req.session.user.id], displayData);

  }
  function displayData(err, results) {
    res.render('view/ViewAllTags.html', {

      tags: result.tags,
      pagename: 'PIPS - View All Tags',
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      user_email: req.session.user.user_email

    });
  }
});
 

module.exports = router;