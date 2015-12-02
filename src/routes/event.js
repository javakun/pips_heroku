var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function (req, res) {
    var result = {};
    var eventName;
    eventName = req.query.eventName; //url.split("/viewTagged?tagButton=").join('');
    // client.query("SELECT * FROM event WHERE event.member_list @> '{$1}'::int[];",
    client.query("SELECT * FROM event WHERE event_name = '" + eventName + "'", eventData);

    function eventData(err, eventCatalogueResult) {
        result.event = eventCatalogueResult.rows.map(function (event) {
            return {
                eventId: event.event_id,
                eventName: event.event_name,
                eventDesc: event.event_description,
                eventDate: event.event_date,
                eventLoc: event.event_loc,
                eventAdmin: event.admin_id,
                eventMembers: event.member_list,
                eventTags: event.tag_list
            }
        });
        client.query("SELECT * FROM users", display);
    }
    function display(){
        res.render('page/EventPage.html', {
            //information to be used for template filling
            pagename: 'PIPS - Event - ' + result.event.eventName,
            event: result.event,
            length: "hi",
            user_email: req.session.user.user_email
        });
    }

});

module.exports = router;