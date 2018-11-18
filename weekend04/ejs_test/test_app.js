var http = require('http');
var express = require('express');
var fs = require('fs');
var ejs = require('ejs');

var app = express();

var router = express.Router();

app.set('port', process.env.PORT||3000);

router.route('/test').get(function(req, res) {
    console.log('test ejs...')
    fs.readFile('views/test.ejs', 'utf8', function(err, data) {
        res.writeHead(200, {"Content-Type":'text/html'});
        res.end(ejs.render(data, {'user':'ydkim2110'}));
    });
});

app.use('/', router);


http.createServer(app).listen(app.get('port'), ()=>{
    console.log('express started.');
})
