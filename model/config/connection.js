const mysql = require('mysql');
const imageHost = 'http://fatihsimsek.me/restoran/Public/Uploads/';
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'restoran'
});

module.exports = {
  connection : connection,
  imageHost : imageHost
}; 