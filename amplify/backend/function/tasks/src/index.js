const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database-1.cjsttbydw6j6.ap-northeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'todomanager'
});

const response = {
  statusCode: 200,
  headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
  }, 
  body: ""
};

exports.handler = (event, context, callback) => {
  const sql = 'select * from TODOS;';
  var res = '';

  connection.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      return err;
    }
    response['body'] = JSON.stringify(result)
    callback(null, response);
  });
  connection.end();
};
