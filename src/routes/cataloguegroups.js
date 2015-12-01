var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function(req, res, next) {
   var result = {};
    client.query("SELECT * FROM groups ",selectGroup);

    function selectGroup(error, r1) {
        result.group = r1.rows.map(function (group) {

            return {

                group_id: group.group_id,
                group_name: group.group_name,
                group_desc: group.group_description,
                group_admin: group.admin_id,
                member_list: group.member_list,
                tag_list: group.tag_list
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
        res.render('catalogue/CatalogueGroups.html', {
            //information to be used for template filling
            pagename: 'PIPS - Groups Catalogue',
            group: result.group,
            user_email: req.session.user.user_email,
            profile_name: results.rows[0].profile_name,
            notification: result.notifications
        })
    }

});

module.exports = router;
