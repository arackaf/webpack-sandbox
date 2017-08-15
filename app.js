let moduleId = require.resolveWeak('./code/util1');

if (+new Date() < 0){  //it won't be
    import('./code/util1').then(({default: obj}) => {
    });
} else {
    debugger;
    let p = __webpack_require__(moduleId);
    p.then(res => {
        debugger;
    })

    __webpack_require__.e/* import() */(0).then(() => __webpack_require__(1)).then(({default: obj}) => {
        console.log(obj);
        //__webpack_require__.bind(null, 1)
    });
}