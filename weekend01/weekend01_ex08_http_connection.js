// http 서버 연결

var http = require('http');

//var server = http.createServer((req, res) => {
//    console.log('요청 들어옴');
//    res.end('<h1>Hello World</h1>');
//});

var server = http.createServer();


var port = 3000;

server.listen(port, () => {
    console.log('http://localhost:%d', port);
});

console.log('시작');

server.on('request', (req, res) => {
    console.log('request');
    server.close();
    res.end('<h1>Hello...</h1>');
});

server.on('connection', socket => {
    console.log('connection');
});

server.on('close', () => {
    console.log('close');
});