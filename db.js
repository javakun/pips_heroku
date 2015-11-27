
//DB Method to give client to every router.
//Leaves client connection open.

var pg = require('pg');
var client;
module.exports.getClient = function () {
  if (client) {
    return client;
  } else {
      client = new pg.Client({
      user: "ipznqcmmcmdvtq",
      password: "au3qPIwR9qT3XPwAYCJuszzCSw",
      database: "dgek9pf0b67pu",
      port: 5432,
      host: "ec2-54-163-228-188.compute-1.amazonaws.com",
      ssl: true
    });
    client.connect();
    //client.end();
    return client;
  }
}