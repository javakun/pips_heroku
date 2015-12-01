var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function (req, res, next) {

  var result = {};
  client.query("SELECT * FROM project ", selectProject);

  function selectProject(error, r1) {
    result.project = r1.rows.map(function (project) {

      return {

        project_id: project.project_id,
        project_name: project.project_name,
        project_desc: project.project_description,
        project_admin: project.project_admin_id,
        project_completion: project.project_completion,
        member_list: project.member_list,
        tag_list: project.tag_list
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
    res.render('catalogue/CatalogueProjects.html', {
      //information to be used for template filling
      pagename: 'PIPS - Project Catalogue',
      project: result.project,
      user_email: req.session.user.user_email,
      profile_name: results.rows[0].profile_name,
      notification: result.notifications
    })
  }

});

module.exports = router;
