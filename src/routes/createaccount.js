var express = require('express');
var router = express.Router();

//DB CLIENT
var client = require('../../db').getClient()

//Method to post account information into DB
router.post('/createAcc', function(req, res, next) {
  var User_ID = client.query("SELECT COUNT(*) FROM users") + 1;
  var User_Email = req.body.Email;
  var User_Password = req.body.Password;
  client.query("INSERT INTO users VALUES($1, $2, $3)", [User_ID, User_Email, User_Password]);
});

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('create/CreateAccountPage.html', {  sitename: 'Create Account' });
});

module.exports = router;
