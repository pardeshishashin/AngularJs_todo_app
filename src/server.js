var express = require('express');
var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('./db');
var todoAPI = require('./router/todo-router.js');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3400);


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/../client_todo_app')));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    next();
  });
app.use('/api/todo', todoAPI);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../client_todo_app/index.html')); 
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
