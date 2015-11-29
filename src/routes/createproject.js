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
    res.redirect('/project');
  }

});

/* GET Create Project page. */
router.get('/', function (req, res, next) {
  res.render('create/CreateProjectPage.html', {
    sitename: 'Create Project',
    owner_name: req.session.user.name,
    owner_email: req.session.user.user_email
  });
});

module.exports = router;
