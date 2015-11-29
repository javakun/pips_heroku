var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function (req, res) {
      res.render('page/EventPage.html', {
        sitename: 'Events'
      })

});
module.exports = router;