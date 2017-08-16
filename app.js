let arr = [
    import('./code/util1' /* webpackChunkName: 'util' */),
    import('./code/util2' /* webpackChunkName: 'util-two' */),
    import('./code/util3' /* webpackChunkName: 'util-three' */)
];
let moduleId = require.resolveWeak('./code/util1');
let moduleId2 = require.resolveWeak('./code/util2');
let moduleId3 = require.resolveWeak('./code/util3');

if (+new Date() < 0){  //it won't be
} else {
    debugger;
    setTimeout(() => {
        __webpack_require__.e/* import() */(moduleId).then(() => __webpack_require__(moduleId).then(({default: res}) => {
            debugger
        }));
    });

    setTimeout(() => {
        __webpack_require__.e/* import() */(moduleId2).then(() => __webpack_require__(moduleId2).then(({default: res}) => {
            debugger
        }));
    });    

    setTimeout(() => {
        __webpack_require__.e/* import() */(moduleId3).then(() => __webpack_require__(moduleId3).then(({default: res}) => {
            debugger
        }));    
    });
    // __webpack_require__.e/* import() */(0).then(() => __webpack_require__(1)).then(({default: obj}) => {
    //     console.log(obj);
    //     //__webpack_require__.bind(null, 1)
    // });
}