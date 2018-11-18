// pipe를 이용한 입출력 스트림 사용

var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, exists => {
    if (exists) {
        fs.unlink(outname, err => {
            if (err) throw err;            
            console.log(`기존 ${outname} 파일을 삭제함`);
        });
    }
    
    var infile = fs.createReadStream(inname, {flag: 'r'});
    var outfile = fs.createReadStream(outname, {flag: 'w'});
    
    infile.pipe(outfile);
    
    console.log(`파일복사 됨`);
});