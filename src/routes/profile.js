var express = require('express');
var router = express.Router();
var client = require('../../db').getClient();

/* GET About Us page. */
router.get('/', function (req, res) {
      // Method to query information from different tables to fill the profile.
      
      var result = {};

      client.query("SELECT * FROM post WHERE post.user_id = $1", [req.session.user.id], selectPost);

      function selectPost(err, results) {
            result.posts = results.rows.map(function (post) {
                  return {
                        id: post.post_id,
                        content: post.post_content,
                        tags: post.post_tags
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
                  [req.session.user.id], selectResume);

      }

      function selectResume(err, results) {
            result.resume = results.rows[0];

            client.query("SELECT * FROM profile WHERE profile.profile_id = $1",
                  [req.session.user.id], displayData);
      }

      function displayData(err, results) {
            if (results.rows[0]) {
                  if (result.posts.length == 0) {
                        result.posts = null;
                        client.end();
                        res.render('page/ProfilePage.html', { 
                              //information to be used for template filling
                              sitename: req.session.user.username,
                              user_email: req.session.user.user_email,
                              profile_name: results.rows[0].profile_name,
                              profile_age: results.rows[0].profile_age,
                              profile_desc: results.rows[0].profile_desc,
                              profile_country: results.rows[0].profile_country,
                              // profile_resume: result.resume,
                              notification: result.notifications,
                              posts: result.posts

                        })
                  } else {
                        client.end();
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
                              posts: result.posts

                        })
                  }
            } else {
                  res.redirect('/createprofile')
            }
      }

});

//Method to post post information into DB
router.post('/postinfo', function (req, res) {

      var post_id;
      client.query("SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1", postID);
      function postID(err, results) {

            post_id = results.rows[0].post_id;
            post_id = post_id + 1;
            var post_title = req.body.post_title;
            var post_content = req.body.post_content;
            var post_tags = req.body.post_tags;

            client.query("INSERT INTO post VALUES($1, $2, $3, $4)",
                  [post_id, post_content, req.session.user.id, post_tags]);
            client.end();
      }
});

router.get('/postinfo', function (req, res) {
      res.redirect('/profile');
});

//Method to post post information into DB
router.post('/updatebioinfo', function (req, res) {

      var profile_name = req.body.profile_name;
      var profile_desc = req.body.profile_desc;
      var profile_country = req.body.profile_country;
      var profile_age = req.body.profile_age;
      var deleteaccount = 0;
      deleteaccount = req.body.deleteaccount.value;


      if (deleteaccount != 0) {
            client.query("DELETE FROM users WHERE users.user_id = $1",
                  [req.session.user.id], DelAccount);
            function DelAccount(err, results) {
                  client.end();
                  req.session.user = null;
                  res.redirect('/');
            }
      } else {
            client.query("UPDATE profile SET profile_name= $1, profile_desc = $2, profile_country = $3, profile_age = $4 WHERE profile.profile_id = $5",
                  [profile_name, profile_desc, profile_country, profile_age, req.session.user.id]);
            client.end();
      }
});

router.get('/updatebioinfo', function (req, res) {
      res.redirect('/profile');
});


module.exports = router;