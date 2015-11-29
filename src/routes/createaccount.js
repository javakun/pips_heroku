var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

//Method to post account information into DB
router.post('/createAcc', function(req, res, next) {
  var User_ID;
  client.query("SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1",newUser);
  
  function newUser(err,results){
    User_ID = results.rows[0].user_id;
    User_ID = User_ID +1 ;
    var User_Email = req.body.Email;
    var User_Password = req.body.Password;
    
    client.query("INSERT INTO users VALUES($1, $2, $3);",[User_ID, User_Email, User_Password]);
    res.redirect('/login');
  }
});


/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('create/CreateAccountPage.html',{  
    sitename: 'Create Account' });
});

module.exports = router;
