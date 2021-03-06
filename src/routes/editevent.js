var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function(req, res, next) {
  
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
    client.query("SELECT * FROM profile WHERE profile.profile_id = $1",
      [req.session.user.id], displayData);

  }

  function displayData(err, results) {
    res.render('edit/EditEvent.html', {
      //information to be used for template filling
      pagename: 'PIPS - Edit Event',
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      admin_email: req.session.user.user_email
    })
  }

});

module.exports = router;
