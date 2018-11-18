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
router.route('/process/login/:name').post((req, res) => {
    console.log('==========/process/login/:name POST 요청==========');
    
    var paramId =  req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.params.name;
    
    console.log(`paramId >>>>>>>>>>>>>> ${paramId}`);
    console.log(`paramPassword >>>>>>>>>>>>>> ${paramPassword}`);
    console.log(`paramName >>>>>>>>>>>>>> ${paramName}`);

    res.writeHead(200, {"Content-Type":'text/html;charset=utf8'});
    res.end(`
        <h1>paramId : ${paramId}</h1>
        <h1>paramPassword : ${paramPassword}</h1>
        <h2>paramName : ${paramName}</h2>
        <a href="/public/login.html">로그인페이지로 돌아가기</a>
    `);
});

// 라우터 미들웨어 설정(라우터 객체를 app 객체에 등록)
app.use('/', router);

// router 미들웨어 설정 후에 사용
var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404' : './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`http://locahost:${app.get('port')}`);
});