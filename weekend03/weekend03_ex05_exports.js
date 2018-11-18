// exports에 속성을 추가 - 모듈에서 접근
// exports를 새로운 객체로 대체하면 - 일반 JS변수로 취급
// exports는 module.exprots를 생략한 것


// 
module.exports = {
    getUser : function() {
        return {id : 'test01', name : '방탄소년단'}
    },
    
    group : {
        id : 'group01', name : 'friend'
    }
}