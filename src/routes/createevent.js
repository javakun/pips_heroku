var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

//Method to post event information into DB
router.post('/createEv', function (req, res, next) {
  var Event_ID;

  client.query("SELECT event_id FROM event ORDER BY event_id DESC LIMIT 1", create);

  function create(err, re) {
    Event_ID = re.rows[0].event_id;
    Event_ID = Event_ID + 1;
    var Event_Name = req.body.EName;
    var Event_Desc = req.body.EDesc;
    var Event_Date = req.body.EDate;
    var Event_Loc = req.body.ELoc;
    var Event_Admin = req.session.user.id;
    var Event_Members = req.body.EMembers;
    var Event_Tags = req.body.tagsinput;

    //arrays must be added directly in the query because of syntax errors (fixable?)
    client.query("INSERT INTO event VALUES($1, $2, $3, $4, $5, $6, '{" + Event_Members + "}', '{" + Event_Tags + "}');", [Event_ID, Event_Name, Event_Desc, Event_Date, Event_Loc, Event_Admin]);
    res.redirect('/event');
    //client.query("SELECT * FROM project WHERE project.tag_id @> '{"+ tag_id +"}'::int[]",selectProjects);
  }
});

/* GET Create Event page. */
router.get('/', function (req, res, next) {

  var result = {};

  client.query("SELECT * FROM notifications WHERE notifications.user_id = $1",
    [req.session.user.id],
    selectNotifications);


  function selectNotifications(err, results) {
    result.notifications = results.rows.map(function (notification) {
      return {
        id: notification.noti_id,
        description: notification.noti_description,
        title: notification.noti_title,
        link: notification.noti_link
      }
    });
    client.query("SELECT * FROM profile WHERE profile.profile_id = $1",
      [req.session.user.id], displayData);

  }

  function displayData(err, results) {
    res.render('create/CreateEventPage.html', {
      //information to be used for template filling
      pagename: 'PIPS - Create Event',
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      admin_email: req.session.user.user_email
    })
  }
});

module.exports = router;
