var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const dbConnection = require('./config');


router.post('/api/reporting/run-sql', function (req, res, next) {
  let connection = dbConnection.dbConnection();

  
  fs.readFile(req.body['sqlPath'], 'utf-8', (err, sql) => {
    if (err) throw err;


    var param = req.body['parameters'];
    param.forEach(element => {
      sql = sql.replace("%s", element);
    });

    var sql_final = sql;

    connection.query(sql_final, function (error, results, fields) {
      connection.end();
      console.log(error);
      if (error) 
      {         
        console.log(error);

        return res.status(500).send({ status: false })
      }
      res.status(200).send({ result: results, status: true });
    });
  });
  
});







module.exports = router;
