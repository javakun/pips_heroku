var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

//Method to post group information into DB
router.post('/createG', function (req, res, next) {
  var Group_ID;
  client.query("SELECT group_id FROM groups ORDER BY post_id DESC LIMIT 1", create);
  
  var Group_Name = req.body.GName;
  var Group_Desc = req.body.GDesc;
  var Admin_ID  = req.session.user.id;
  var Tag_ID = req.body.tagsinput;
  var Member_List = null;
  
  function create (err, results){
    Group_ID = results.row[0].group_id;
    Group_ID = Group_ID + 1;
    client.query("INSERT INTO groups VALUES:($1, $2, $3, $4, $5, $6)",[Group_ID, Group_Name, Group_Desc, Admin_ID, Tag_ID, Member_List]);
    res.redirect('/cataloguegroups');
  }
});

/* GET About Us page. */
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
    res.render('create/CreateGroupPage.html', {
      //information to be used for template filling
      pagename: 'PIPS - Create Group',
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      admin_email: req.session.user.user_email
    })
  }
});

module.exports = router;
