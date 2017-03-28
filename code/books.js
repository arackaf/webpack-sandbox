function getUtil(){
    import('./util');
}

function getUtil2(){
    import('./util2');
}

export default function(x, y){
    if (x){
        getUtil();
    }
    if (y){
        getUtil2();
    }
}