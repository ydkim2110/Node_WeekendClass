var fs = require('fs');


// 동기방식 IO
var data = fs.readFileSync('./package.json', 'utf8');

console.log(data);