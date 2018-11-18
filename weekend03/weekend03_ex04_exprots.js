// exports에 속성을 추가하고 함수나 객체를 지정.
// JS는 객체에 속성을 맘대로 추가 할 수 있다.

exports.getUser = function() {
    return {id : 'test01', name : '소녀시대'}
}

exports.group = {
    id : 'group1',
    name : '친구'
}

module.exports;