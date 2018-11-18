// Process

/*
console.dir(process.env.os);
console.dir(process.env.path);
console.log(process.argv);
console.log(process.argv.length);
console.log(process.argv[0]);
console.log(process.argv[1]);
*/

// console.log(process.argv);
// cnod 창에서 실행
// node [파일명] 파라미터1, 파라미터2...

//if (process.argv.length > 2) {
//    console.log(process.argv[2]);
//}

//if (process.argv.length > 2) {
//    for (var i=2; i<process.argv.length; i++) {
//        console.log(process.argv[i]);
//    }
//}


process.argv.forEach(function(item, index) {
    if (index >= 2) {
        console.log(index + ' : ' + item);   
    }
});





