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
});

/* GET About Us page. */
router.get('/', function (req, res, next) {
  res.render('submit/SubmitSuggestions.html', {
    sitename: 'Submit Suggestion',
    user_email: req.session.user.user_email
  });
});

module.exports = router;
