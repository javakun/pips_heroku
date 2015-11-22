var express = require('express');
var router = express.Router();

/* GET Create Project page. */
router.get('/', function(req, res, next) {
  res.render('create/CreateProjectPage.html', { sitename: 'Create Project' });
});

module.exports = router;
