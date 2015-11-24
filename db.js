var pg = require('pg');
var client = new pg.Client({
  user: "ipznqcmmcmdvtq",
  password: "au3qPIwR9qT3XPwAYCJuszzCSw",
  database: "dgek9pf0b67pu",
  port: 5432,
  host: "ec2-54-163-228-188.compute-1.amazonaws.com",
  ssl: true
});
client.connect();