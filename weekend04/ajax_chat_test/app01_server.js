var http = require('http');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.end("Hello World!! GET: ", req.url);
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('Express Server Started :', app.get('port'));
});