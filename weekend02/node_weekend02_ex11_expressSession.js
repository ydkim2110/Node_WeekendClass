var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

var app = express();

app.set('port', process.env.PORT || 3000);

// static 미들웨어 지정 : __dirname + '/public'도 가능
app.use('/public', static(path.join(__dirname, 'public')));

// body-parser 미들웨어 지정
app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// cookie-parser, express-session 미들웨어 지정
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));


// 라우터 객체 참조
var router = express.Router();

router.route('/process/product').get((req, res) => {
    console.log('========== /process/product GET 요청 ==========');
    
    if (req.session.user === undefined) {
        console.log('========== undefined > login 이동 ==========');
        res.redirect('/public/login.html');
    } else {
        console.log('========== product 이동 ==========');
        res.redirect('/public/product.html');
    }
});

router.route('/process/logout').get((req, res) => {
    console.log('========== /process/logout GET 요청 ==========');  
    
    if (req.session.user) {
        req.session.destroy(err => {
            if(err) throw err
            console.log(`로그아웃 되었습니다.`);
        });
    } else {
        console.log(`로그인 안된 상태입니다.`);
    }
    res.redirect('/public/login.html');
});

router.route('/process/login').post((req, res) => {
    console.log('==========/process/login POST 요청==========');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    if(req.session.user) {
        console.log(`이미 로드인 되어 상품 페이지로 이동함.`);
        res.redirect('/public/product.html');
    } else {
        
        // DB에서 test01정보를 가져와서 paramId와 비교한다.
        
        // 로그인 정보를 세션에 저장한다.
        console.log(`로그인 정보를 세션에 저장.`);
        req.session.user = {
            id : paramId,
            name : '방탄소년단',
            authorized : true
        }
    }

    console.log(`paramId >>>>>>>>>>>>>> ${paramId}`);
    console.log(`paramPassword >>>>>>>>>>>>>> ${paramPassword}`);

    res.writeHead(200, {
        "Content-Type": 'text/html;charset=utf8'
    });
    res.end(`
        <h1>paramId : ${paramId}</h1>
        <h1>paramPassword : ${paramPassword}</h1>
        <a href="/public/login.html">로그인페이지로 돌아가기</a>
    `);
});

// 라우터 미들웨어 설정(라우터 객체를 app 객체에 등록)
app.use('/', router);

// router 미들웨어 설정 후에 사용
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`http://locahost:${app.get('port')}`);
});
