var express = require('express');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.set('port', process.env.PORT||3000);

var db;
function connectDB() {
    var dbUrl = 'mongodb://localhost:27017';
    
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) throw err;
        
        console.log(`서버에 연결되었습니다. ${dbUrl}`);
        db = client.db('vehicle');
    });
}

var router = express.Router();

router.route('/car_list').get((req, res) => {
    console.log('############## car_list - GET 요청 ##############');
    
    // 컬렉션 지정
    var car = db.collection('car');
    car.find({price: {$gt:1000}}).toArray((findErr, docs) => {
        if (findErr) throw findErr;
        
        // console.dir(docs);
        
        docs.forEach((item, index) => {
             console.log(`${index} : ${item.name}`);
        });
        
        res.writeHead(200, {'Content-Type':'charset=utf8'});
        for(doc of docs) {
            console.log(doc.name + ', '+ doc.company);
            res.write(`<p>${doc.name}, ${doc.company}</p>`)
        }
        res.end();
    });
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`express server started at: http://localhost:${app.get('port')}`);
    connectDB();
})