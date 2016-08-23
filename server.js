var express = require('express');
var path = require('path');

var app = express();
var port = 5000;
var ONEDAY = 86400000;

app.use('/dist', express.static(__dirname + '/dist', {maxAge: ONEDAY}));

app.use('/src', express.static(__dirname + '/src', {maxAge: ONEDAY}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})

app.listen(port, function(err) {
    console.log('running server on port' + port);
})
