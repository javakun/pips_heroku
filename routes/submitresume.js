var express = require('express');
var router = express.Router();

/* GET Submit Resume page. */
router.get('/', function(req, res, next) {
  res.render('submit/SubmitResumePage', { sitename: 'Submit Resume' });
});

module.exports = router;