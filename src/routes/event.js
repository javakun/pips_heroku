var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function (req, res) {
    var result = {};
    var eventName= "";
    eventName = req.query.eventName; //url.split("/viewTagged?tagButton=").join('');
    // client.query("SELECT * FROM event WHERE event.member_list @> '{$1}'::int[];",
    client.query("SELECT * FROM event WHERE event_name = '"+ eventName +"';", eventData);

    function eventData(err, eventCatalogueResult) {
        result.e = eventCatalogueResult.rows.map(function (event) {
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
        display(result);
    }

    function display(r){
        res.render('page/EventPage.html', {
            E: r.e,
            user_email: req.session.user.user_email
        });
    }

});

module.exports = router;