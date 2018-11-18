// 파일명 : weekend01_ex04_EventEmit_2.js
// 사용자 정의 모듈 불러오기 (상대경로 사용)

var Calc = require('./weekend01_ex04_EventEmit');

var calc = new Calc();

calc.add(10, 20);

console.log("결과: "+calc.getResult());

calc.emit('stop');

console.log(Calc.title);
