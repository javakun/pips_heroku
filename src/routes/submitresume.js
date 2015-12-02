var express = require('express');
var router = express.Router();

//DB CLIENT
var client = require('../../db').getClient()

//Method to post resume into db
router.post('/submitR', function (req, res) {
  var User_ID = req.session.user.id;
  var Resume_Body = req.body.editor1;
  var row_c = client.query("SELECT COUNT(*) FROM resume") + 1;
  client.query("INSERT INTO resume VALUES($1, $2, $3)",[row_c,Resume_Body,User_ID]);
  res.redirect('/profile');
});

/* GET Submit Resume page. */
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
    res.render('submit/SubmitResumePage.html', {
      //information to be used for template filling
      pagename: 'PIPS - Submit Resume',
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      admin_email: req.session.user.user_email
    })
  }

});

module.exports = router;
