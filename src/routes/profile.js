var express = require('express');
var router = express.Router();
var client = require('../../db').getClient()

/* GET About Us page. */
router.get('/', function (req, res, next) {
      // Method to query information from different tables to fill the profile.
      
      var result = {};

      client.query("SELECT * FROM post WHERE post.user_id = $1", [req.session.user.id], selectPost)

      function selectPost(err, results) {
            result.posts = results.rows.map(function (post) {
                  return {
                        id: post.post_id,
                        content: post.post_content
                  }
            })

            client.query("SELECT * FROM notifications WHERE notifications.user_id = $1",
                  [req.session.user.id],
                  selectNotifications)
      }

      function selectNotifications(err, results) {
            
            result.notifications = results.rows.map(function (notification) {
                  return {
                      id: notification.noti_id,
                      description: notification.noti_description,
                      // FINISH THIS
                  }
            })
            
            result.noti_id = row.notification_id;
            result.noti_desc = row.noti_description;
            result.noti_title = row.noti_title;
            result.noti_link = row.noti_link;
            
            client.query("SELECT * FROM resume WHERE resume.user_id = $1 ", [req.session.user.id])
                  .on('row', selectResume);
      }

      function selectResume(row) {
            result.resume = row.resume_body;

            client.query("SELECT * FROM profile WHERE profile.profile_id = $1", [req.session.user.id])
                  .on('row', displayData);
      }

      function displayData(row) {
            if (row) {
                  res.render('page/ProfilePage.html', { 
                        //information to be used for template filling
                        sitename: req.session.user.username,
                        user_email: req.session.user.user_email,
                        profile_name: row.profile_name,
                        profile_age: row.profile_age,
                        profile_desc: row.profile_desc,
                        profile_resume: result.resume,
                        notification: {
                              noti_id: result.noti_id,
                              noti_desc: result.noti_desc,
                              noti_title: result.noti_title,
                              noti_link: result.noti_link
                        },
                        posts: result.posts
                  });
            } else {
                  res.redirect('/createprofile')
            }
      }




});

module.exports = router;
