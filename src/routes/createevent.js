var express = require('express');
var router = express.Router();

//DB CLIENT
var client = require('../../db').getClient()

//Method to post event information into DB
router.post('/createEv', function(req, res, next) {
  var Event_Name = req.body.EName;
  var Event_Desc = req.body.EDesc;
  var Event_Date = req.body.EDate;
  var Event_Loc = req.body.ELoc;
  var Event_Admin = req.session.user.id;
  var Event_Members = null;
  var Event_Tags= req.body.tagsinput;
  var row_c = client.query("SELECT COUNT(*) FROM event") + 1;
  
  client.query("INSERT INTO event VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [row_c, Event_Name, Event_Desc, Event_Date, Event_Loc, Event_Admin, Event_Members, Event_Tags]);
});

/* GET About Us page. */
router.get('/', function(req, res, next) {
  res.render('create/CreateEventPage.html', { sitename: 'Create Event' });
});

module.exports = router;
