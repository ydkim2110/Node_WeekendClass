var http = require('http');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/google', (req, res) => {
    console.log(`/google 요청 받음`);
    
    // 구글 페이지로 갱신(redirect)
    res.redirect('http://google.com');
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`express server started at: http://localhost:${app.get('port')}`);
});