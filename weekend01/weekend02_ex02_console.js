console.log('이름: %s', '홍길동');

console.log('나이: %d', 25);

console.log('객체의 내용: %j', {'name':'kim', 'age':25});

console.dir({'name':'kim', 'age':25});

var result = 0;

console.time('time_check');

for(var i=1; i<=10000; i++) {
    result += i;
}

console.timeEnd('time_check');

console.log('result: '+result);

console.log('파일명: '+__filename);

console.log('파일패스: '+__dirname);

console.log(__dirname.length);
console.log(__filename.substring(__dirname.length));