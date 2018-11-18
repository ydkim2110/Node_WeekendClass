var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer();

server.on('request', function(req, res) {
    
    if(req.url.indexOf('favicon') == -1) {
        var curUrl = url.parse(req.url); // URL 객체로 변환
        var path = req.url.substring(0, req.url.indexOf('?'));
        console.log('path >>>>>>>>>>'+path);
        
        if(path === "/login") {
            console.log(req.url);
            var param = querystring.parse(curUrl.query); // 요청 파라미터 구분하기
            console.log(param);
            console.log(`param.name: ${param.name}`);
            console.log(`param.msg: ${param.msg}`);

            res.end('<h1>Login Page</h1>');
        } else if(path === '/logout') {
            res.end('<h1>Logout Page</h1>');
        }

    }
    
});

server.on('connection', function(socket) {
    console.log('connection event!!');
    var addr = socket.address();
    console.log(`${addr.address} & ${addr.port}`);

});

server.on('close', function() {
    console.log('close event!!');
});

var port = 3000;
server.listen(port, function() {
    console.log(`http://localhost:${port}`);
});

console.log('시작~~!');
