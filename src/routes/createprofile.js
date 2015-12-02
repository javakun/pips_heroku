var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

//Method to post account information into DB
router.post('/createP', function (req, res, next) {
  var Profile_Name = req.body.Name;
  var Profile_Id = req.session.user.id;
  var Profile_Age = req.body.Age;
  var Profile_Desc = req.body.Description
  var Profile_Country = req.body.Country;
  var post_id;
  
    client.query("SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1", create);
   
  
  function create(err, results) {
    post_id = results.rows[0].post_id;
    post_id = post_id + 1;

   // client.query("INSERT INTO followers VALUES($1, $2)", [1, req.session.user.id]);
    client.query("INSERT INTO profile VALUES($1, $2, $3, $4, $5, $6)", [Profile_Name, Profile_Id, Profile_Age, 1, Profile_Desc, Profile_Country]);
    client.query("INSERT INTO post VALUES($1, $2, $3)", [post_id, 'Welcome to PIPS', req.session.user.id]);
  
    res.redirect('/profile');
   
  }
});

/* GET About Us page. */
router.get('/', function (req, res, next) {
  res.render('create/CreateProfile.html', { sitename: 'Create Profile' });
});

module.exports = router;
