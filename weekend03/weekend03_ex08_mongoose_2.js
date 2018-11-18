var http = require('http');
var express = require('express');
var app = express();

var mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);

var database;
var UserSchema; // Class임
var UserModel;

function connectDB() {
    var dbUrl = 'mongodb://localhost:27017/local';
    
    // DB 연결시도
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl);
    database = mongoose.connection;
    
    database.on('err', console.error.bind(console, 'mongoose error.'));
    database.on('open', () => {
        console.log(`DB에 연결되었음 : ${dbUrl}`);
        
        // DB 연결이 되면 Schema와 Model을 생성한다.
        UserSchema = mongoose.Schema({
            id       : String,
            password : String,
            name     : String
        });
        
        UserModel = mongoose.model('users', UserSchema);
        
        UserModel.find({id : 'test01', password : '12345'}, (err, docs) => {
            if (err) throw err;
            
            if (docs.length > 0) {
                console.log(docs[0].name);
            } else {
                console.log('사용자가 없음~!!');
            }
        })
    })
    
    // 연결이 끊어지면 5초후에 재연결
    database.on('disconnected', () => {
        console.log(`연결이 끊어졌음. 5초후에 재연결~~`);
        setTimeout(connectDB, 5000);
    });
}


http.createServer(app).listen(app.get('port'), () => {
    console.log(`server started. : http://localhost:${app.get('port')}`);
    connectDB();
});





