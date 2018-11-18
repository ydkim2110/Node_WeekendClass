// use() 함수를 이용해서 사용자 정의 미들웨어 등록
var express = require('express');
var http = require('http');
var util = require('util');

var app = express();

app.set('port', process.env.PORT || 3000);

// 사용자 정의 미들웨어 추가
app.use('/', (req, res, next) => {
    console.log(`첫번째 미들웨어에서 요청 처리...`);
    
    req.user = "홍길동";
    next(); // 다음 미들웨어 호출
});

// 사용자 정의 미들웨어 추가
app.use('/', (req, res, next) => {
    console.log(`두번째 미들웨어에서 요청 처리...`);
    
    var msg = util.format(`<h1>Util.format() : </h1>`, req.user);
    
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    res.end(`
        <h1>express 서버에서 응답함!</h1>
        <p>${msg}</p>
        <p>${req.user}</P>
        <p>Home</P>
        <p>About</P>
    `);
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`express started at http://localhost:${app.get('port')}`);
});