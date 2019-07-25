## async和await详解

### async的作用

```javascript
async function testAsync(){
    return "try async"
}
const result = testAsync();
console.log(result);
//控制台输出
Promise {<resolved>: "try async"}
```

所以，async函数返回的是一个Promise对象

如果是一个直接量，saync会把这个直接量通过Promise.resolve()封装成Promise对象，如果没有返回值，那它会返回Promise.resolve(undefined)



所以，最外层不能用await获取的返回值的情况下，应该用原来的方式then()来处理这个对象

```javascript
testAsync().then(v=>{
    console.log(v)
})
//控制台输出
try async
```

Promise是无等待的，所以在没有使用await的情况下，执行async函数，它会立即执行，返回一个promise对象，且不会阻塞后面的语句。这个普通返回Promise的函数没有什么区别

### await

#### await在等待什么

一般认为await是在等待一个async函数完成，不过按照语法说明，await等待的是一个表达式，这个表达式的计算结果是Promise对象或者其他值。

async函数返回一个Promise对象，所以await用于等待一个async函数的返回值（不仅仅是Promise对象，还可以是任意表达式的结果）。

```javascript
function getValue(){
    return "hi";
}

async function testAsync(){
    return Promise.resolve("hello async");
}

async function test(){
    const v1=await getValue();
    const v2=await testAsync();
    console.log(v1,v2);
}
test();

//控制台输出
hi hello async
Promise {<resolved>: undefined}
```

#### 等到了要等的，然后做什么

await函数等到了一个Promise或者一个表达式的结果。

它其实是一个运算符，用于组成表达式，其运算结果取决于它等的内容：

如果不是一个Promise对象，运算结果就是它等到的东西

如果是一个Promise对象，await会阻塞后面的代码，等着Promise对象resolve，然后得到它的值作为await的结果。

> 这个就是await为何要用在async函数中的原因，async函数调用不会阻塞，它内部所有阻塞都被封装在一个Promise对象中异步执行

### async/await怎么用

用setTimeout模拟耗时的异步操作：

```javascript
function takeLongTime(){
    return new Promise(resolve=>{
        setTimeout(()=>resolve("long_time_value"),1000);
    })
}
takeLongTime().then(v=>{
   console.log("got",v)
})
```

如果改用async/await：

```javascript
function takeLongTime(){
    return new Promise(resolve=>{
        setTimeout(()=>resolve("long_time_value"),1000);
    })
}
async function test(){
    const v=await takeLongTime();
    console.log(v);
}
test();
```

takeLongTime本身返回的就是Promise对象，加不加async都一样

不过看上去似乎差别不明显

### async/await优势在于处理then链

单一的 Promise 链并不能发现 async/await 的优势，但如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了。

> Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它

假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。

```javascript
//传入参数n，表示函数执行时间，执行结果是n+200，这个值用于下一步骤
function takeLongTime(n){
    return new Promise(resolve=>{
        setTimeout(()=>resolve(n+200),n);
    });
}
function step1(n){
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}
function step2(n){
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}
function step3(n){
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```

现在用Promise方式来实现三个步骤的处理

```javascript
function doIt(){
    console.time("doIt");
    const time1=300;
    step1(time1).then(time2=>step2(time2))
        		.then(time3=>step3(time3))
        		.then(result=>{
        			console.log(`result is ${result}`)
        			console.timeEnd("doIt")
    });
}
doIt();

//控制台输出
> step1 with 300
> step2 with 500
> step3 with 700
> result is 900
> doIt: 1501.7548828125ms
```

如果用async/await来实现：

```javascript
function doIt()=>{
    console.time("doIt");
    const time1=300;
    const time2=await step1(time1);
    const time3=await step2(time2);
    const result=await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt")
}
doIt();

//控制台输出
step1 with 300
step2 with 500
step3 with 700
result is 900
doIt: 1501.7548828125ms
```

和之前实现结果是一样的，但这个代码看起来更清晰。

还是刚才的题目。如果要求，三个步骤每个都需要返回之前所有步骤的结果。

```javascript
function takeLongTime(n){
    return new Promise(resolve=>{
        setTimeout(()=>resolve(n+200),n);
    });
}
function step1(n){
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}
function step2(m,n){
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m+n);
}
function step3(k,m,n){
    console.log(`step3 with ${k} , ${m} and ${n}`);
    return takeLongTime(k+m+n);
}
```

先用async/await写

```java
async function doIt(){
    console.time("doIt");
    const time1=300;
    const time2=await step1(time1);
    const time3=await step2(time1,time2);
    const result=await step3(time1,time2,time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
```

如果把它写成 Promise 方式:

```javascript
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}
doIt();
```

看着就眼晕，那一堆参数处理，就是 Promise 方案的死穴—— 参数传递太麻烦了！

