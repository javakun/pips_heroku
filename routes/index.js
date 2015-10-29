var express = require('express');
var router = express.Router();
//var conString = "postgres://ipznqcmmcmdvtq:au3qPIwR9qT3XPwAYCJuszzCSw@ec2-54-163-228-188.compute-1.amazonaws.com:5432/dgek9pf0b67pu";

 //pg.connect(conString, function(err, client, done) {
 // if (err) {
 //   return console.error('error fetching client from pool', err);
 // }
  /*
  client.query('SELECT * from USER;', function(err, result) {
    done();
    // ahora result va a tener el resultado del query.
    console.log(result);

    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
  });
*/
//});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('page/ProfilePage_Index', { sitename: 'PIPS'  });
});

module.exports = router;
