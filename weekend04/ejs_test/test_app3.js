var http = require('http');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var util = require('util');
var static = require('serve-static');
var mongoose = require('mongoose');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, 'public')));

// 데이터베이스 연결
var database;
var UserSchema;
var UserModel;

function connectDB() {
    var dbUrl = 'mongodb://localhost:27017/local';
    
    mongoose.Promise = global.Promise;    
    mongoose.connect(dbUrl, { useNewUrlParser: true });
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose error.'));
    database.on('open', () => {
        console.log('데이터베이스에 연결 되었습니다. :', dbUrl);
        
        // User 스키마 및 모델 생성
        createUserSchema();
    });
    
    database.on('disconnected', () => {
        setTimeout(connectDB, 5000);
    });
}

function createUserSchema() {
    UserSchema = mongoose.Schema({
        id : String,
        password : String,
        name : String
    });
    
    UserSchema.static('findAll', function(callback) {
        return this.find({}, callback);
    })
    
    // UserModel 모델 정의
    UserModel = mongoose.model('users', UserSchema);
}

router.route('/users/list').get((req, res) => {
    console.log('==================== /users/list 요청 =====================');
    if (database) {
        UserModel.findAll((err, results) => {
            if (err) {console.log('사용자 리스트 에러 발생'); return;}
            if (results) {
                var docs = [];
                for (i in results) {
                    docs.push(results[i]);
                }                
            } else {
                console.log('사용자 조회 실패!');
            }
        });
    }
    
});

// router 미들웨어 등록
app.use('/', router);

http.createServer(app).listen(app.get('port'), ()=>{
    console.log('Express Server Started.'); 
    connectDB();
});