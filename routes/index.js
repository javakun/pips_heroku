var express = require('express');
var router = express.Router();
//var conString = "postgres://username:password@localhost/database";

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("i am inside home page!!");
  //

/*
  pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * from USER;', function(err, result) {
    done();
    // ahora result va a tener el resultado del query.
    console.log(result);

    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
  });

});
*/
  res.render('index', { title: 'Express' });
});

router.get('/ferni', function(req, res, next) {
  res.render('index', { title: 'ferni' });
});


module.exports = router;
