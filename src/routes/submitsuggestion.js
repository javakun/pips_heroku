var express = require('express');
var router = express.Router();

//DB CLIENT
var client = require('../../db').getClient()

//Method to post info into sendgrid email
router.post('/sendE', function (req, res, next) {
  var Email_Text = req.body.editor1;

  var sendgrid = require('sendgrid')('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');

  var email = new sendgrid.Email({
    to: 'pips.teamdb@gmail.com',
    from: req.session.user.user_email,
    subject: 'A friendly suggestion for the PIPS Team',
    text: Email_Text
  });

  sendgrid.send(email, function (err, json) {
    if (err) { return console.error(err) }
    console.log(json);
  });
  res.redirect('/submitsuggestion');
});

/* GET About Us page. */
router.get('/', function (req, res, next) {
  
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
    res.render('submit/SubmitSuggestions.html', {
      //information to be used for template filling
      pagename: 'PIPS - Submit Suggestion',
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      user_email: req.session.user.user_email
    })
  }
});

module.exports = router;
