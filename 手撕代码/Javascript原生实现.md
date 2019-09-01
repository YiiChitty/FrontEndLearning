# Javascript原生实现

为面试做准备，每次面试前必须速看一遍!

## call

```javascript
Function.prototype.myCall=function(context){
    if(typeof this !=='function'){
        throw new TypeError('error');
    }
    context=context||window;
    context.fn=this;
    const args=[...arguments].slice(1);
    const result=context.fn(...args);
    delete context.fn;
    return result;
}
```

## apply

```javascript
Function.prototype.myApply=function(context){
    if(typeof this !== 'function'){
        throw new TypeEerror('Error');
    }
    context=context||window;
    context.fn=this;
    let result;
    if(arguments[1]){
        result=context.fn(...arguments[1]);
    }else{
        result=context.fn();
    }
    delete context.fn;
    return result;
}
```

## bind

```javascript
Function.prototype.myBind=function(context){
    if(typeof this !=='function'){
        throw new TypeError('Error');
    }
    const _this=this;
    const args=[...arguments].slice(1);
    //返回一个函数
    return function F(){
        //通过new的方式
        if(this instanceof F){
            return new _this(...args,...arguments)
        }
        return _this.apply(context,args,concat(...arguments));
    }
}
```

## new

```javascript
function create(con,...args){
    let obj={};
    obj._proto_=con.prototype;
    //绑定this并执行构造函数
    let result=con.apply(obj,args);
    return result instanceof Object? result:obj
}
```

## 防抖

```javascript
function debounce=(func,wait)=>{
    let timer=0;
    return function(...args){
        if(timer){
            clearTimeout(timer);
        }
        timer=setTimeout(()=>{
            func.apply(this,args);
        },wait)
    }
}
```

## 节流

```javascript
function throttle(func,wait,option){
    let last；
    return function(...args){
        let now+=new Date();
        if(!last||now>last+wait){
            last=now;
            func.apply(this,args);
        }
    }
}
```

## 手写Promise

```javascript
const PENDING="pending"
const RESOLVED="resolved"
const REJECTED="rejected"

function Promise(fn){
    //先写大体框架
    const self=this
    self.value=null
    self.reason=null
    self.state=PENDING
    //用于保存 then 中的回调，只有当 promise状态为 pending 时才会缓存，并且每个实例至多缓存一个
    self.onFulfilledCallbacks=[]
    self.onRejectedCallbacks=[]
    
    //再写resolve和reject
    function resolve(value){
        if(self.state=PENDING){
            self.state=RESOLVED
            self.value=value
            self.onFullFilledCallbacks.forEach(onFulFilled => onFulFilled())
        }
    }
    function reject(reason){
        if (self.state==PENDING){
            self.state=REJECTED
            self.reason=reason
            self.onRejectedCallbacks.foreach(onRejected=>onRejected())
        }
    }
    //处理执行函数
	try{
        fn(resolve,reject)
    }catch(e){
        reject(e)
    }
}
//实现Promise.then
Promise.prototype.then=function(onFulFilled,onRejected){
	const that = this
    let p2Resolve, p2Reject;
    //先生成一个新的对象
	let p2 = new promise((resolve, reject) => {
		p2Resolve = resolve;
        p2Reject  = reject;
	});
    //判断状态
    if(that.state==PENDING){
       that.onFulfilledCallbacks.push(()=>{
       		onFulfilled(that.value)
           	p2Resolve()
       })
       that.onRejectedCallbaxks.push(()=>{
           onRejected(that.reason)
           p2Reject()
       })
    }else if (that.state==RESOLVED){
        onFulfilled(that.value)
        p2Resolve()
    }
    else if (this.state == REJECTED) {
        onRejected(this.reason);
        p2Reject();
    }
    return p2；
}
```

## 实现Promise.all

```javascript
//Promise.all
//多个Promise任务并行执行,输入是一个数组，最后输出一个新的Promise对象
//1.如果全部成功执行，则以数组的方式返回所有Promise任务的执行结果；
//2.如果有一个Promise任务rejected，则只返回 rejected 任务的结果。
function promiseAll(promises){
    return new Promise(resolve,reject)=>{
        if(!Array.isArray(promises)){
            return reject(new Error("arguments must be an array"))
        }
        let promisecounter=0,
            promiseNum=promises.length,
            //保存结果
            resolvedValues=new Array(promisNum);
        for(let i =0;i<promiseNum;i++){
            (function(i){
                Promise.resolve(promises[i]).then((value)=>{
                    promiscounter++;
                    resolvedValues[i]=value;
                    if(promiseCounter==promiseNum) {
                        return resolve(resolvedValues);
                    }
                }).catch(err=>{reject(err)})
            })(i)
    	}
}
```

## 深拷贝

```javascript
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}
```

