// 클래스를 대체 시키면서 모듈 엑스포트에 클래스가 저장한다.
var User = require('./weekend03_ex07_exports_class');

// 인스턴스 생성 후 사용
var user = new User('test01', '줌마시대');

console.log(user);