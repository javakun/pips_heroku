var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

//Method to post project information into DB
router.post('/createPro', function (req, res, next) {
  var Project_ID;
  client.query("SELECT project_id FROM project ORDER BY post_id DESC LIMIT 1", create);
  
  var Project_Name = req.body.PName;
  var Project_Desc = req.body.PDesc;
  var Project_AdminID = req.session.user.id;
  var Project_Comp = req.body.PComp
  var Member_List = null;
  var Tag_List = req.body.tagsinput;
  
  function create(err, result){
    client.query("INSERT INTO project VALUES($1, $2, $3, $4, $5, $6, $7)", [Project_ID, Project_Name, Project_Desc, Project_AdminID, Project_Comp, Member_List, Tag_List]);
    res.redirect('/catalogueprojects');
  }

});

/* GET Create Project page. */
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
    res.render('create/CreateProjectPage.html', {
      //information to be used for template filling
      pagename: 'PIPS - Create Project',
      profile_name: results.rows[0].profile_name,
      notification: result.notifications,
      admin_name: req.session.user.name,
      admin_email: req.session.user.user_email
    })
  }
});

module.exports = router;
