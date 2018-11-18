var http = require('http');
var express = require('express');
var static = require('serve-static');

var app = express();

app.set('port', 3000);

app.use('/public', static(__dirname + '/public')); // 외부에서 들어오는 path & 현재폴더에서 public 폴더를 static 으로 지정

app.get('/index', (req, res) => {
    console.log('/index entry~!!');
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    res.write(`
        <html>
            <body>
                <h1>Welcome to 홍길동 HomePage~!!</h1>
                <p>Profile</p>
                <img src="./public/img01.jpg" style="width: 300px; height: 250px;">
            </body>
        </html>
    `);
    res.end();
});

var server = http.createServer(app).listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
});