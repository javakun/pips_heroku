var express = require('express');
var router = express.Router();

//DB CLIENT
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
  }
});

/* GET About Us page. */
router.get('/', function (req, res, next) {
  res.render('create/CreateGroupPage.html', { 
    sitename: 'Create Group', 
    admin_name: req.session.user.name,
    admin_email: req.session.user.user_email
    });
});

module.exports = router;
