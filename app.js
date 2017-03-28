let a = 0 < 9+9 ? 'a' : 'b';

loadIt(a);
function loadIt(val){
    switch(a){
        case 'a': return System.import('./code/books').then(({default: mod}) => { setTimeout(() => mod(1, 1), 2000); });
        case 'b': return System.import('./code/settings');
    }
}