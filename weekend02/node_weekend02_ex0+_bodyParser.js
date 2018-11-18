var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// 라우터 객체 참조
var router = express.Router();

app.set('port', process.env.PORT || 3000);

// static 미들웨어 지정 : __dirname + '/public'도 가능
app.use('/public', static(path.join(__dirname, 'public')));

// body-parser 미들웨어 설정
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// POST 방식에 반응
// app.get() 대신에 router.route().post() 사용
router.route('/put_name').post((req, res) => {
    console.log('==========/put_name POST 요청==========');
    console.log(req.body);
    
    var userAgent = req.header('User-Agent');
    var paramName = req.body.name || req.query.name;
    console.log(`paramName >>>>>>>>>>>>>> ${paramName}`);
    console.log(`userAgent >>>>>>>>>>>>>> ${userAgent}`);
    
    res.writeHead(200, {"Content-Type":'text/html;charset=utf8'});
    res.end(`
        <h1>paramName : ${paramName}</h1>
        <h1>userAgent : ${userAgent}</h1>
    `);
});


// 라우터 미들웨어 설정(라우터 객체를 app 객체에 등록)
app.use('/', router);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`http://locahost:${app.get('port')}`);
});