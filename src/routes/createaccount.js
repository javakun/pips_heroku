var express = require('express');
var router = express.Router();

//DB CLIENT
var client = require('../../db').getClient()

//Method to post account information into DB
router.post('/', function(req, res, next) {
  
  
});

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('create/CreateAccountPage.html', {  sitename: 'Create Account' });
});

module.exports = router;
