var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function (req, res) {

    var result = {};
   // client.query("SELECT * FROM event WHERE event.member_list @> '{$1}'::int[];",
   client.query("SELECT * FROM event ",
        selectEvent);

    function selectEvent(err, results) {
        result.events = results.rows.map(function (event) {

            return {
                e_id: event.event_id,
                e_name: event.event_name,
                e_location: event.event_loc,
                e_date: event.event_date,
                e_description: event.event_description,
                e_admin: event.admin_id,
                e_member_list: event.member_list,
                e_tag_list: event.tag_list
            }
        });
        client.query("SELECT * FROM notifications WHERE notifications.user_id = $1",
            [req.session.user.id],
            selectNotifications);
    }

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
        res.render('catalogue/CatalogueEvents.html', {
            //information to be used for template filling
            pagename: 'PIPS - Events Catalogue',
            events: result.events,
            user_email: req.session.user.user_email,
            profile_name: results.rows[0].profile_name,
            notification: result.notifications
        })
    }

});
module.exports = router;