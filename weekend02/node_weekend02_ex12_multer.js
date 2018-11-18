var express = require('express');
var http = require('http');
var path = require('path');
var util = require('util');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');
var expressErrorHandler = require('express-error-handler');

var expressSession = require('express-session');

var multer = require('multer');
var fs = require('fs');

var cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

app.use(cookieParser());

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialzed: true
}));

// CORS(다중서버접속) 미들웨어 설정
app.use(cors());

// 파일업로드 설정
// multer 미들웨어 : 미들웨어 설정
// body-parser -> multer -> router 순으로 실행
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    
    filename: (req, file, callback) => {
        callback(null, file.originalname+Date.now());
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024 // 1GB
    }
});

var router = express.Router();

// 라우터 함수에 path 등록
router.route('/process/photo').post(upload.array('photo', 1), (req, res) => {
   console.log('============== /process/photo POST 요청 ==============');
   
   try {
       
       var files = req.files;
       
       console.log(`########### 업로드된 첫번째 파일 정보 ###########`);
       console.log(files[0]);
       console.log(`#############################################`);
       
       var originalname = "";
       var filename = "";
       var mimetype = "";
       var size = 0;
       
       if (Array.isArray(files)) {
           console.log('배열에 들어있는 파일의 갯수 : %d', files.length);
           for (var i=0; i<files.length; i++) {
               originalname = files[i].originalname;
               filename = files[i].filename;
               mimetype = files[i].mimetype;
               size = files[i].size;
           }
       } else {
           console.log('파일 갯수: 1개');
               originalname = files.originalname;
               filename = files.filename;
               mimetype = files.mimetype;
               size = files.size;
       }
       
       var message = util.format('파일정보: %s, %s, %s, %s', originalname, filename, mimetype, size);
       console.log(`파일정보: ${originalname}, ${filename}, ${mimetype}, ${size}`);
       
       res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
       res.end(`
            <h2>파일 업로드 정보</h2>
            <hr>
            <p>${message}</p>
        `);
       
   } catch (err) {
       console.log(err.stack);
   }
   
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
});