var http = require('http');
var express = require('express');
var util = require('util');

var app = express();

app.set('port', process.env.PORT || 3000);

// 사용자 정의 미들웨어 등록하고 요청 응답으로 JSON 객체 전달
app.use('/', (req, res, next) => {
    console.log(`첫번째 미들웨어에서 요청을 처리함.`);
    
    res.send({name: '방탄소년단', age: 21});
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`express server started at: http://localhost:${app.get('port')}`);
});