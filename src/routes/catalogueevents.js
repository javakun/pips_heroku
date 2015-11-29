var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function (req, res) {
    var result = {};
    client.query("SELECT * FROM event WHERE event.member_list @> '{"+ [req.session.user.id] +"}'::int[];", selectEvent);

    function selectEvent(error, r1) {
      result.events = r1.rows.map(function (event) {

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
        pagename: 'PIPS - Events Catalogue',
        events: result.events
      })
    }

});
module.exports = router;