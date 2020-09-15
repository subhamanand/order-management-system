var mysql = require('mysql');
const MysqlHost = "localhost";
const MysqlUser = "root";
const MysqlPass = "Current-Root-Password";
const MysqlDB = "order_management";
const MysqlPort=3306;


var connection; 

module.exports = {

    dbConnection: function () {

        connection = mysql.createConnection({
          host     : MysqlHost,
          port     : MysqlPort,
		  user     : MysqlUser,
		  password : MysqlPass,
          database : MysqlDB,
          multipleStatements: true
		});
        connection.connect();
        return connection;
    }

};
