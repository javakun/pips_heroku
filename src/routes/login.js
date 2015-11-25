var express = require('express');
var router = express.Router();
//var pg = require('pg');
//var id, user_name, user_password;
//var client = new pg.Client({
//  user: "ipznqcmmcmdvtq",
//  password: "au3qPIwR9qT3XPwAYCJuszzCSw",
//  database: "dgek9pf0b67pu",
//  port: 5432,
//  host: "ec2-54-163-228-188.compute-1.amazonaws.com",
//  ssl: true
//});
//client.connect();

<<<<<<< HEAD
//DB CLIENT
var client = require('../../db').getClient()


//Method to render page login or if a session is open redirect to profile
router.get('/', function (req, res) {
  if (!req.session.user) {
    res.render('page/LoginPage.html', {
      sitename: 'Login'
    });
  } else {
    res.redirect('/profile')
  }

});

//Method to validate Login info with db
router.post('/', function (req, res) {
  var User_Pass = req.body.Password
  var User_Name = req.body.Username

  var query = client.query("SELECT * FROM users WHERE user_id = '1'");

  query.on('row', function (row) {
    if (row.user_email == User_Name && row.user_password == User_Pass) {
      //  id = row.user_id;
      //  user_name = row.user_email;
      //  user_password = row.user_password;
      req.session.user = {
        username: User_Name,
        id: row.user_id
      };

      res.redirect('/profile');
    } else {
      res.redirect('/');
    }
=======
//var pg = require('pg');
//var id, user_name, user_password;
//var client = new pg.Client({
//  user: "ipznqcmmcmdvtq",
//  password: "au3qPIwR9qT3XPwAYCJuszzCSw",
//  database: "dgek9pf0b67pu",
//  port: 5432,
//  host: "ec2-54-163-228-188.compute-1.amazonaws.com",
//  ssl: true
//});
//client.connect();
//var query = client.query("SELECT * FROM users WHERE user_id = '1'");
//query.on('row', function(row) {
//    if(row.user_email == 'javier.colon15@upr.edu'){
//        if(row.user_password == 'qwerty'){
//            id = row.user_id;
//            user_name = row.user_email;
//            user_password = row.user_password;
//            console.log(id);
//        }
//    }
//    console.log(id);
//    console.log(row);
//});
//
//query.on('end', function() {
//    client.end();
//});

/* GET About Us page. */

router.get('/', function(req, res) {
  res.render('page/LoginPage.html',{
    sitename: 'Login'
>>>>>>> b145a3215cc65ddda501478e3ab394902aa9d3f6
  });
})

//method to logout and end session
router.post('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;
 
