// 인스턴스를 exports 모듈로 만든다.
function User(id, name) {
    this.id = id;
    this.name = name;
}

// JS에서 클래스 선언 시 prototype 객체 이용.
User.prototype.getUser = function() {
    return {
        id   : this.id, 
        name : this.name
    };
}

User.prototype.group = {id : 'group01', name : '친구'};

User.prototype.printUser = function() {
    console.log(`user 이름 : ${this.name} group 이름 : ${this.group.name}`);
}

module.exports = new User('test01', '소녀시대'); // 인스턴스 생성