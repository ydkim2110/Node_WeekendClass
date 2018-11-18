

// ES6 문법으로 Class 만들기
class People {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    
    showInfo() {
        console.log(this.id + ", " + this.name);
    }
}

class User extends People {
    constructor(id, name) {
        super(id, name);        
        this.group = {id : 'test', name : 'family'};
    }
}

// let user = new User('hello', 'world');
// user.showInfo();

module.exports = User;