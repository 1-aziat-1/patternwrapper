const wrap = fn => {
    let limit = 0 ;
    let counter = 0;

    const wrapper = (...args) => {
        if(limit && counter === limit) wrapper.blocked();
        if(fn){
            counter ++;
            let res = fn(...args);
            return res;
        }
    }

    wrapper.blocked = () => {
        fn = null;
        return wrapper;
    }

    wrapper.limited = (count = 1) => {
        limit = count;
        return wrapper;
    }

    wrapper.timeOut = msec => {
        setTimeout(()=>wrapper.blocked(),msec);
        return wrapper;
    }

    return wrapper;
}

const foo  = (a,b,c) => {
    return a+b+c;
}

const wrpFoo = wrap(foo);
wrpFoo.timeOut(3000);
console.log(wrpFoo(1,2,3));
console.log(wrpFoo(1,2,3));
console.log(wrpFoo(1,2,3));
console.log(wrpFoo(1,2,3));
console.log(wrpFoo(1,2,3));

setTimeout(()=>console.log(wrpFoo(9,9,9)),4000)


// const wrapper  = function (fn) {
//     console.log('оборачиваем функцию: ', fn.name);
//     return function(){
//         const args = Array.from(arguments);
//         console.log('Вызов обертки для ', fn.name);
//         console.log('Аргументы: ', args);
//         const result = fn.apply(null, args);
//         console.log('Результат выполнения функции', fn.name);
//         console.log(result);
//         return result;
//     }
// };

// const foo = (a,b) =>{
//     return a + b ;
// }

// const bar = wrapper(foo);

// bar(5,15);
// console.log(bar (5,15));

// const wrapper = (fn) => {
//     return function(){
//         const args = Array.from(arguments);
//         const result = fn.apply(null,args);
//         return result;
//     }
// } 

// function foo(a,b){
//     return a + b;
// }

// const wrpFoo = wrapper(foo);

// console.log(wrpFoo(3,5));

// const strKey = item => item.toString() + '(' + typeof item + ')';
// const generationKey = args => args.map(strKey).join(',');


// const memoize = fn => {
//     const cache = {};

//     return(...args)=>{
//         const key = generationKey(args);
//         const val = cache[key];
//         if(val) return val;
//         const res = fn(...args);
//         cache[key] = res;
//         return res;
//     }
// };

// const fib = (n) => (n<=2 ? 1 : fib(n-1) + fib(n-2));

// const fibMem = memoize(fib);

// console.log(fibMem(40));
// console.log(fibMem(45));

// const once  = fn => (...args) => {
//     if(!fn) return ;
//     const res = fn(...args);
//     fn = null;
//     return res;
// };

// const maxCall = (count, fn) => {
//     let counter = 0;
//     return (...args) => {
//         if(counter === count) return ;
//         counter++;
//         const res = fn(...args)
//         return res;
//     }
// };
// const foo = (a,b,c) => {
//     return a+b+c;
// };

// const onceOne = maxCall(3,foo)
// console.log(onceOne(1,2,3));
// console.log(onceOne(2,2,3));
// console.log(onceOne(4,2,3));
// console.log(onceOne(6,2,3));


