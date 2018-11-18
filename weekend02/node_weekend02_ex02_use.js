// use() 함수를 이용해서 사용자 정의 미들웨어 등록
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

// 사용자 정의 미들웨어 추가
app.use((req, res, next) => {
    console.log(`첫번째 미들웨어에서 요청 처리...`);
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"});
    res.end(`
        <h1>express 서버에서 응답함!</h1>
        <p>Home</P>
        <p>About</P>
    `);
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`express started at http://localhost:${app.get('port')}`);
});