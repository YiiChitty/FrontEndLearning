//实现按钮防2次点击操作
//在规定时间内再次触发就清除定时后重新设置，直到不触发了
function debounce(fn,delay){
    let timer=0;
    return function(...args){
            if (timer) clearTimeout(timer)
            timer=setTimeout(()=>{func.apply(this,args)},delay);
    }
}

function fn(){
    console.log('防抖')
}
addEventListener('scroll',debounce(fn,1000))