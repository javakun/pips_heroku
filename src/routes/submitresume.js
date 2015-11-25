var express = require('express');
var router = express.Router();

//DB CLIENT
var client = require('../../db').getClient()

//Method to post resume into db
router.post('/submitR', function (req, res) {
  var User_ID = req.session.user.id;
  var Resume_Body = req.body.editor1;
  var row_c = client.query("SELECT COUNT(*) FROM resume");
  client.query("INSERT INTO resume VALUES($1, $2, $3)",[row_c + 1,Resume_Body,User_ID]);
});

/* GET Submit Resume page. */
router.get('/', function(req, res, next) {
  res.render('submit/SubmitResumePage.html', { sitename: 'Submit Resume' });
});

module.exports = router;
