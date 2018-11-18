var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors');


app.set('port', process.env.PORT || 3000);

// 크로스 도메인 문제해결
app.use(cors());

app.get('/', (req, res) => {
    res.end("Hello World!! GET: ", req.url);
});

app.get('/calc/:op/:a/:b', function(req, res) {
    console.log('plus');
    var op = req.params.op;
    var a = parseInt(req.params.a);
    var b = parseInt(req.params.b);
    var result = "";
    if (op === 'plus') {
        result = a + b;
    } else if (op === 'minus') {
        result = a - b;
    } else if (op === 'mult') {
        result = a * b;
    } else if (op === 'div') {
        result = a / b;
    }
    res.end(""+result);
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('Express Server Started :', app.get('port'));
});