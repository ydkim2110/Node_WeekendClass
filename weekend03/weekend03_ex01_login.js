// 기본모듈
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const static = require('serve-static');
const util = require('util');

// 세션, 쿠키, 로그인 관련 모듈
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// 에러처리 관련 모듈
const errorHandler = require('errorhandler');
const expressErrorHandler = require('express-error-handler');

// 라우팅 매핑을 위한 모듈
const router = express.Router();

app.set('port', process.env.PORT || 3000);

// 미들웨어 지정
app.use('/public', static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 쿠키, 세션 미들웨어
app.use(cookieParser());
app.use(expressSession({
    secret           : 'my key',
    resave           : true,
    saveUninitialzed : true
}));

app.use("/", router);

function print(req, res, msg) {
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"})
    res.end(msg);
}


router.route('/process/login').post((req, res) => {
    console.log(`========= /process/login 요청 들어옴! =========`);
    
    var paramId = req.body.id || req.query.id;
    var paramPwd = req.body.password || req.query.password;
    
    var msg = util.format('paramId: %s, paramPwd: %s', paramId, paramPwd);
    console.log(`paramId: ${paramId} && paramPwd: ${paramPwd}`);
    
    if (req.session.user) {
        const htmlTag =  `
            <h2>이미 로그인 되어있음!</h2>
            <a href="/public/product.html">상품페이지 이동</a>
        `;        
        print(req, res, htmlTag);
    } else {
        // 세션에 저장
        req.session.user = {
            id         : paramId,
            name       : '소년시대',
            authorized : true
        };        
        
        const htmlTag =  `
            <h2>로그인 성공!</h2>
            <p>${msg}</P>
            <a href="/public/product.html">상품페이지 이동</a>
        `;        
        print(req, res, htmlTag);
    }    

});

router.route('/process/logout').get((req, res) => {
    
    if (req.session.user) {
        req.session.destroy(err => {if (err) throw err;});
    }
    
    const htmlTag =  `
        <h2>로그아웃 되었습니다.</h2>
        <a href="/public/login.html">====> 로그인 이동</a>
    `;        
    print(req, res, htmlTag);
});

http.createServer(app).listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
});