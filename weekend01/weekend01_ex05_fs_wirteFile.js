// 파일 데이터를 비동기방식으로 쓰기

var fs = require('fs');

var data = 'Hello NodeJS World!';

// 데이터가 파일에 쓰기 완료되면 콜백함수 실행
// fs.writeFile(파일명, 데이터, 콜백함수);
fs.writeFile('./output.txt', data, err => {
    if (err) {
        console.log('Error: ' + err);
    }
    console.log('쓰기 완료!');
});


console.log('비동기 방식의 파일 입출력 예제 :::');
