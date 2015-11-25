var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

/* GET About Us page. */
router.get('/', function (req, res) {
      // Method to query information from different tables to fill the profile.
      
       var result = {};
   
      client.query("SELECT * FROM post WHERE post.user_id = $1", [req.session.user.id], selectPost);

      function selectPost(err, results) {
            result.posts = results.rows.map(function (post) {
                  return {
                        id: post.post_id,
                        content: post.post_content
                  }
            })

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
                    
            client.query("SELECT * FROM resume WHERE resume.user_id = $1 ", 
            [req.session.user.id],selectResume);
                   
      }

      function selectResume(err, results) {
            result.resume = results.rows[0];

            client.query("SELECT * FROM profile WHERE profile.profile_id = $1", 
            [req.session.user.id],displayData);
      }

      function displayData(err,results) {
            if (results.rows[0]) {
                  res.render('page/ProfilePage.html', { 
                        //information to be used for template filling
                        sitename: req.session.user.username,
                        user_email: req.session.user.user_email,
                        profile_name: results.rows[0].profile_name,
                        profile_age: results.rows[0].profile_age,
                        profile_desc: results.rows[0].profile_desc,
                        profile_country: results.rows[0].profile_country,
                        profile_resume: result.resume,
                        notification: result.notifications,
                        posts: result.posts,
                        //posts_content:result.posts.content
                  })
                 // res.send('test');
                  
            } else {
                  res.redirect('/createprofile')
            }
      }

});

module.exports = router;