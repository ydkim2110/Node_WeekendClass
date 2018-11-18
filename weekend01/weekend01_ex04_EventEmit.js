// exit 이벤트 처리
/*
process.on('exit', () => {
    console.log('exit 이벤트 발생!');
});

console.log('2초 후에 시스템 종료');
setTimeout(() => {
    process.exit();
}, 2000)
*/

// 사용자 정의 이벤트
// process.emit()으로 이벤트 발생 -> process.on()으로 이벤트 처리
/*
process.on('tick', count => {
    console.log('tick 이벤트 발생 했다 : %d', count);
});

console.log('2초 뒤에 사용자 이벤트 발생');
setTimeout(() => {
    process.emit('tick', 365);
}, 2000);
*/

// 파일명 : weekend01_ex04_EventEmit.js
// 사용자 모듈을 사용하는 파일에서 상대경로로 require()한다.

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Calc = function() {
    this.result = 0;
    var self = this;
    this.on('stop', function() {
        console.log('Calc 클래스에 stop 이벤트 전달');
    });
};

// 상속
util.inherits(Calc, EventEmitter);

Calc.prototype.add = function(a, b) {
    this.result = a + b;
    return this.result;
};

Calc.prototype.getResult = function() {
    return this.result;
}

module.exports = Calc;
module.exports.title = 'calculator';










