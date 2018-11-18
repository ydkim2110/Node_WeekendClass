// login.html에서 받은 정보를 ejs 파일로 데이터 전송하고,
// test2.ejs 파일에서 보여지도록 한다.
var http = require('http');
var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var router = express.Router();

app.set('port', process.env.PORT||3000);

app.use('/public', static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

router.route('/process/login').post((req, res) => {
    console.log('======== /process/login ========');
    fs.readFile('views/test2.ejs', 'utf8', function(err, data) {
        res.writeHead(200, {"Content-Type":'text/html'});
        res.end(ejs.render(data, {'loginData':req.body}));
    });    
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), () => {
    console.log('express server started.');
})