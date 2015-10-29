var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('edit/EditGroup', { sitename: 'Edit Group' });
});

module.exports = router;
