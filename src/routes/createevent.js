var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

//Method to post event information into DB
router.post('/createEv', function (req, res, next) {
  var Event_ID;
  client.query("SELECT event_id FROM event ORDER BY post_id DESC LIMIT 1", create);

  var Event_Name = req.body.EName;
  var Event_Desc = req.body.EDesc;
  var Event_Date = req.body.EDate;
  var Event_Loc = req.body.ELoc;
  var Event_Admin = req.session.user.id;
  var Event_Members = null;
  var Event_Tags = req.body.tagsinput;

  function create(err, results) {
    Event_ID = results.rows[0].event_id;
    Event_ID = Event_ID + 1;
    client.query("INSERT INTO event VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [Event_ID, Event_Name, Event_Desc, Event_Date, Event_Loc, Event_Admin, Event_Members, Event_Tags]);
  }
});

/* GET Create Event page. */
router.get('/', function (req, res, next) {
  res.render('create/CreateEventPage.html', { 
    sitename: 'Create Event',
    admin_name: req.session.user.name,
    admin_email: req.session.user.user_email
    });
});

module.exports = router;
