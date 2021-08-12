var mysql = require('mysql');
var pool = mysql.createPool({
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_ravishr',
  password        : '4647',
  database        : 'cs290_ravishr'
});

module.exports.pool = pool;
