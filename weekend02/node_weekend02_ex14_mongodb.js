const MongoClient = require('mongodb').MongoClient;

const dbUrl = "mongodb://localhost"
MongoClient.connect(dbUrl, (err, client) => {
    if(err) throw err;
    
    // mongodb 모듈 3.0 이상에서는 직접 지정
    var db = client.db('vehicle');
    //console.dir(db);
    
    var car = db.collection('car');
    //console.log(car);
    
    car.findOne({}, (findErr, doc) => {
        if (findErr) throw findErr;
        
        console.log(doc);
        client.close();
    });
})