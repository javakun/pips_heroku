var express = require('express');
var router = express.Router();

//DB CLIENT
var client = require('../../db').getClient();


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

    var User_Pass = req.body.Password;
    var User_Name = req.body.Username;
    var query = client.query("SELECT * FROM users WHERE user_email= $1", [User_Name]);

    query.on('row', function (row) {
      if (row.user_email == User_Name && row.user_password == User_Pass) {
        req.session.user = {
          username: User_Name,
          id: row.user_id,
          user_email: row.user_email
        };
        res.redirect('/profile');
        
      } else {
        res.redirect('/');
        
      }
    });
  
});


//method to logout and end session
router.post('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;
 
