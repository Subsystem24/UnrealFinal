const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'unreal-engine.ckgzgvyf08g0.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'mpp34827',
  database: 'Unreal_Factory'
});

connection.connect(function(err) {
  if (err) console.log(err.message) ;
  console.log("Successfully connected");
});

module.exports = connection;
