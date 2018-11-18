var mongojs = require('mongojs');

var db = mongojs('vehicle', ['car']);

db.car.find((err, data) => {
    console.log(data);
});