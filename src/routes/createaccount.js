var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('create/CreateAccountPage', { layout: 'Loginlayout' ,sitename: 'Create Account' });
});

module.exports = router;
