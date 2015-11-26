var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function (req, res) {
  // Method to query information from different tables to fill the profile.

  var result = {};

  client.query("SELECT * FROM event WHERE event.member_list @> '{$1}'::int[];", [req.session.user.id], selectEvent);
  function selectEvent(err, results) {
        result.events = results.rows.map(function (event) {
              return {
                id: event.event_id,
                name: event.event_name,
                location: event.event_loc,
                date: event.event_date,
                description: event.event_description,
                admin: event.admin_id,
                member_list: event.member_list,
                tag_list: event.tag_list
              }
        });

    client.query("SELECT * FROM event WHERE event.member_list @> '{$1}'::int[];",
        [req.session.user.id],
        displayData);
  }

  function displayData(err, results) {
      res.render('catalogue/CatalogueEvents.html', {
        //information to be used for template filling
        sitename: 'Events',
        events: results.events
      })
  }

});
module.exports = router;

//<h1><%= name %></h1>
//<p><%= description %></p>
// <label>Event Date:</label>
//<label><%= date %></label>