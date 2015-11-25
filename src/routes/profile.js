var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()
var resume,noti_desc,noti_title,noti_link,noti_id;

/* GET About Us page. */
router.get('/', function(req, res, next) {
   // Method to query information from different tables to fill the profile.
   var query = client.query("SELECT * FROM profile WHERE profile.profile_id = $1",[req.session.user.id]);
   var query3 = client.query("SELECT * FROM notifications WHERE notifications.user_id = $1",[req.session.user.id]);
   var query2 = client.query("SELECT * FROM resume WHERE resume.user_id = $1 ",[req.session.user.id]);
   
      query3.on('row',function(row){
           this.noti_id = row.notification_id;
           this.noti_desc = row.noti_description;
           this.noti_title = row.noti_title;
           this.noti_link = row.noti_link;
      })
      query2.on('row',function(row){
         this.resume = row.resume_body;
      })
      query.on('row',function(row){
        if(row){
          res.render('page/ProfilePage.html', { 
         //information to be used for template filling
            sitename: req.session.user.username, 
            profile_name:row.profile_name,
            profile_age:row.profile_age,
            profile_resume: this.resume,
            notification:{
                  noti_id: this.noti_id,
                  noti_desc: this.noti_desc,
                  noti_title: this.noti_title,
                  noti_link: this.noti_link
            }
            });
        }else{
          res.redirect('/createprofile')
        }
      })
  
});

module.exports = router;
