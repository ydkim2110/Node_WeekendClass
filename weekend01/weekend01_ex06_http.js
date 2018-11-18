// http 모듈을 이용해서 서버 실행하기

var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
    console.log('서버로 요청이 들어왔습니다.');
    // 파일을 스트림으로 IO해서 res에 출력
    var instream = fs.createReadStream('./output.txt');
    // res 브라우져 화면 출력 객체
    instream.pipe(res);
});

server.listen(3000, () => {
    console.log('서버가 실행 되었습니다.');
});

