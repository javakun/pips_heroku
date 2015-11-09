var express = require('express');
var router = express.Router();
var LoginTest = require('./LoginTest.json');

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('page/LoginPage',{ 
    layout: 'Loginlayout', 
    sitename: 'Login',
    test: LoginTest
     });
});

module.exports = router;
