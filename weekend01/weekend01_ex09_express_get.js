var http = require('http');
var express = require('express');

var app = express();

app.get('/login', (req, res) => {
    var paramName = req.query.name;
    var paramMsg = req.query.msg;
    
    console.log('paramName >>>>> ' + paramName);
    console.log('paramMsg >>>>> ' + paramMsg);
    
    res.end(`
        <h1>login...</h1>
        <p>This is the login page...</p>
        <p>Name : ${paramName}</p>
        <p>Message : ${paramMsg}</p>
    `);
});

app.get('/logout', (req, res) => {
    res.end('<h1>logout...</h1>');
});

var server = http.createServer(app).listen(3000, () => {
    console.log('http://localhost:3000');
});