//节流就是说在一定时间内只会被触发一次
//比如滚动事件啥的
function throttle(fn,delay){
    let last;//上次被触发的时间
    return function(...args){
        let now=+new Date();
        if(!last||now>last+delay){
            last=now;
            func.apply(this,args);
        }
    }
}


//使用
function fn(){
    console.log('节流');
}
addEventListener('scroll',throttle(fn,1000));