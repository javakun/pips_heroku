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
  });
});

module.exports = router;
