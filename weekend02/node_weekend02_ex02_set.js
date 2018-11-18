// 모듈 불러오기
var express = require('express');
var http = require('http');

// express app 객체 생성
var app = express();

// 기본 포트를 app 객체 속성에 지정
app.set('port', process.env.PORT || 3000);

// express 서버 시작
http.createServer(app).listen(app.get('port'), () => {
    console.log(`express started : ${app.get('port')}`);
});