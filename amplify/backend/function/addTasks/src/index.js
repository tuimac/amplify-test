const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database-1.cjsttbydw6j6.ap-northeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'todomanager'
});

exports.handler = async (event) => {
  const sql = 'SHOW TABLES;';
  var res = '';

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res = result;
  });

  return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    }, 
    body: {
      'event': JSON.stringify(event),
      'response': res
    }
  };
};
