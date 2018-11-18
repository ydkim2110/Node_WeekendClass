var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors');


app.set('port', process.env.PORT || 3000);

// 크로스 도메인 문제해결
app.use(cors());

var cnt = 0;

app.get('/count', (req, res) => {
    cnt++;
    var date = new Date();
    var response = {
        "dataStr" : date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes(),
        "count" : cnt
    };
    res.end(JSON.stringify(response));
});


http.createServer(app).listen(app.get('port'), () => {
    console.log('Express Server Started :', app.get('port'));
});