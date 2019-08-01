//双向数据绑定
let obj={};
let input=document.getElementById('input');
let span=document.getElementById('span');

//数据劫持
Object.defineProperty(obj,'text',{
    configurable:true,
    enumerable:true,
    get(){
        console.log('获取数据');
    },
    set(newVal){
        console.log('数据更新');
        input.value=newVal;
        span.innerHTML=newVal;
    }
})

//监听
input.addEventListener('keyup',function(e){
    obj.text=e.target.value;
})