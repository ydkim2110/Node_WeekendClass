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

// 몽고DB모듈 준비
const MongoClient = require('mongodb').MongoClient;



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



function print(req, res, msg) {
    res.writeHead(200, {"Content-Type":"text/html; charset=utf8"})
    res.end(msg);
}

var db;
function connectDB() {
    const dbUrl = "mongodb://localhost:27017";
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) throw err;
        
        console.log(`DB에 연결되었습니다. : ${dbUrl}`);
        db = client.db('local');
    });
}

function authUser(db, id, pwd, callback) {
    console.log(`authUser() 함수 호출됨!! ${id} && ${pwd}`);
    
    // DB에서 users 컬렉션 참조하기
    const users = db.collection('users');
    
    // id와 pwd를 DB에서 검색
    users.find({'id':id, 'password':pwd}).toArray((err, docs) => {
        console.log(`docs.length => ${docs.length}`);
        if (err) {
            callback(err, null);
            return;
        }
        if (docs.length > 0) {
            console.log(`ID: ${id} && PASSWORD: ${pwd}`);
            callback(null, docs);
        } else {
            callback(null, null);
        }
    });
    
} // end of authUser

function addUser(db, userData, callback) {
    console.log('');
    console.log('============ addUser 함수 호출 ===========');
    
    
    // DB에서 users 컬렉션 참조하기
    const users = db.collection('users');
    
    users.insertMany([userData], (err, result) => {
        if (err) throw err;
        
        callback(null, result);
    });
    
} // end of addUser

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
        if (db) {
            authUser(db, paramId, paramPwd, (err, docs) => {
                if (err) throw err;
                
                if (docs) {
                    req.session.user = {
                        id         : paramId,
                        name       : docs[0].name,
                        authorized : true
                    };        

                    const htmlTag =  `
                        <h2>로그인 성공!</h2>
                        <a href="/public/product.html">상품페이지 이동</a>
                    `;        
                    print(req, res, htmlTag);
                } else {
                    print(req, res, '<h2>로그인 실패~!!!!!!!!</h2>');
                }
            });
        }
        
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



router.route('/process/adduser').post((req, res) => {
    console.log('');
    console.log('=========== /process/adduser 요청 처리 =============');
    
    var paramId = req.body.id || req.query.id;
    var paramPwd = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    
    var str = util.format('id: %s, pwd: %s, name: %s', paramId, paramPwd, paramName);
    console.log(`id: ${paramId} && password: ${paramPwd} && name : ${paramName}`);
    
    var userData = {
        'id'       : paramId,
        'password' : paramPwd,
        'name'     : paramName
    }
    
    if (db) {
        addUser(db, userData, (err, result) => {
            if (err) throw err;
            
            if (result.insertedCount > 0) {
                const htmlTag = `
                    <h1>사용자 추가 성공~!!</h1>
                    <P>${str}</p>
                    `;
                print(req, res, htmlTag);
            } else {
                const htmlTag = `
                    <h1>사용자 추가 실패~!!</h1>
                    <P>${str}</p>
                    `;
                print(req, res, htmlTag);               
            }
        });
    } else {
        const htmlTag = `
            <h1>DB 접속 실패~!!</h1>
            <P>${str}</p>
            `;
        print(req, res, htmlTag);            
    }
    
    

});

app.use("/", router);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
    connectDB();
});