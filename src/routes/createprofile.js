var express = require('express');
var router = express.Router();

//DB CLIENT
var client = require('../../db').getClient()

//Method to post account information into DB
router.post('/createP', function (req, res, next) {
  var Profile_Name = req.body.Name;
  var Profile_Id = req.session.user.id;
  var Profile_Age = req.body.Age;
  var Profile_Desc = req.body.Description
  var Profile_Country = req.body.Country;

  client.query("INSERT INTO profile VALUES($1, $2, $3, $4, $5, $6)", [Profile_Name, Profile_Id, Profile_Age, null, Profile_Desc, Profile_Country])
});

/* GET About Us page. */
router.get('/', function (req, res, next) {
  res.render('create/CreateProfilePage.html', { sitename: 'Create Profile' });
});

module.exports = router;
