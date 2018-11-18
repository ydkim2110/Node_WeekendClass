var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

// static 미들웨어 지정 : __dirname + '/public'도 가능
app.use('/public', static(path.join(__dirname, 'public')));

// GET 방식의 요청만 받을 수 있고 POST 방식은 반응 안함.
app.get('/put_name', (req, res) => {
    console.log('==========/put_name 요청==========');
    console.log(req.query);
    
    var userAgent = req.header('User-Agent');
    var paramUsername = req.query.username;
    console.log(`paramUsername >>>>>>>>>>>>>> ${paramUsername}`);
    console.log(`userAgent >>>>>>>>>>>>>> ${userAgent}`);
    
    res.writeHead(200, {"Content-Type":'text/html;charset=utf8'});
    res.end(`
        <h1>paramUsername : ${paramUsername}</h1>
        <h1>userAgent : ${userAgent}</h1>
    `);
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`http://locahost:${app.get('port')}`);
});