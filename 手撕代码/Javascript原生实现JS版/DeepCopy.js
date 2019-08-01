//JSON.parse 解决不了循环引用的问题，会忽略undefined\symbol\函数
let a={}
let b=JSON.parse(JSON.stringify(a));
//循环引用是说a.b.d=a.b这样的

//MessageChannel含有内置类型，不包含函数
function structuralClone(obj){
    return new Promise(resolve=>{
        const{port1,port2}=new MessageChannel();
        port2.onmessage=ev=>{resolve(ev.data)}
        port1.postMessage(obj);
    })
}

//可以处理循环引用对象、也可以处理undefined
//不过它是异步的
const test =async()=>{
    const clone=await structuralClone(obj);
    console.log(clone);
}
test();


//手写一个简单的deepclone
function deepClone(obj){
    function isObject(o){
        return (typeof o==='object'||typeof o==='function')&&o !==null;
    }
    if(!isObject(obj)){
        throw new Error('Not Object')
    }

    let isArray=Array.isArray(obj);
    let newObj=isArray?[...obj]:{...obj};
    Reflect.ownKeys(newObj).forEach(item=>{
        newObj[item]=isObject(obj[item])?deepClone(obj[item]):obj[item];
    })
    return newObj;
}

//还可以这样写
function deepClone(){
    let copy=obj instanceof Array? []:{};
    for(let i in obj){
        if(obj.hasOwnProperty(i)){
            copy[i]=typeof obj[i] ==='object'?deepClone(obj[i]):obj[i];
        }
    }
    return copy;
}