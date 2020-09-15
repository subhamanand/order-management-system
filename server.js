const express = require('express');
var bodyParser = require('body-parser'); 
var api = require('./api');

var cors = require('cors');

const app = express();
app.use('/admin', api);

app.use(express.static(__dirname + '/ui/dist/ui'));
app.use(bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token, data");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


app.use(cors());
app.options('*', cors()); 


app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/ui/dist/ui/index.html'));
});

app.listen(process.env.PORT || 8080);


console.log('app launched');