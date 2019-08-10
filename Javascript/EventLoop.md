## EventLoop

详解可以参看这篇文章：[链接](https://segmentfault.com/a/1190000016022069)

### 进程与线程

进程描述了CPU在运行指令及加载和保存上下文所需的时间。放在应用上说就代表了一个程序。线程是进程中的更小的单位，描述了执行一段指令所需时间。

JavaScript是一个单线程的脚本语言。 所以在一行代码执行的过程中，必然不会存在同时执行的另一行代码。

### 执行栈

可以当它是一个存储函数调用的栈结构，遵循先进后出的原则。

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/EventLoop_01.gif)

当开始执行 JS 代码时，首先会执行一个 `main` 函数，然后执行我们的代码。根据先进后出的原则，后执行的函数会先弹出栈，在图中我们也可以发现，`foo` 函数后执行，当执行完毕后就从栈中弹出了。

### 浏览器中的EventLoop、微任务与宏任务

当我们执行 JS 代码的时候其实就是往执行栈中放入函数。

当遇到异步的代码时，会被**挂起**并在需要执行的时候加入到 Task队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行。

所以本质上来说 JS 中的异步还是同步行为。

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/EventLoop_02.jpg)

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 **微任务**（microtask） 和 **宏任务**（macrotask）。

在 ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。下面来看以下代码的执行顺序：

```javascript
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')

//老浏览器的控制台输出
//测试浏览器版本为 Chrome 66.0.3343.4
script start
async2 end
Promise
script end
promise1
promise2
async1 end
setTimeout
```

当我们调用 `async1` 函数时，会马上输出 `async2 end`，并且函数返回一个 `Promise`，接下来在遇到 `await`的时候会就让出线程开始执行 `async1` 外的代码，所以我们完全可以把 `await` 看成是**让出线程**的标志。

当同步代码全部执行完毕以后，就会去执行所有的异步代码，会回到 `await` 的位置执行返回的 `Promise` 的 `resolve` 函数。此时，把 `resolve` 丢到微任务队列中，接下来去执行 `then` 中的回调，当两个 `then`中的回调全部执行完毕以后，又会回到 `await` 的位置处理返回值，这时候你可以看成是 `Promise.resolve(返回值).then()`，然后 `await` 后的代码全部被包裹进了 `then` 的回调中，所以 `console.log('async1 end')` 会优先执行于 `setTimeout`。



将async的两个函数改造一下，可能更方便理解一点

```javascript
new Promise((resolve, reject) => {
  console.log('async2 end')
  // Promise.resolve() 将代码插入微任务队列尾部
  // resolve 再次插入微任务队列尾部
  resolve(Promise.resolve())
}).then(() => {
  console.log('async1 end')
})
```

也就是说，如果 `await` 后面跟着 `Promise` 的话，`async1 end` 需要等待三个 tick 才能执行到。

其实这个性能相对来说还是略慢的，所以 V8 团队借鉴了 Node 8 中的一个 Bug，在引擎底层将三次 tick 减少到了二次 tick。但是这种做法其实是违法了规范的，当然规范也是可以更改的，这是 V8 团队的一个 [PR](https://github.com/tc39/ecma262/pull/1250)，目前已被同意这种做法。



**!所以现在的浏览器await 变快了**



现在的浏览器输出顺序：

```javascript
//控制台输出
//测试版本为 Chrome 75.0.3770.100
script start
async2 end
Promise
script end
async1 end   <----这里被提前了，执行了console才去执行的promise.then
promise1
promise2
setTimeout
```

**总结一下**

 Event Loop 执行顺序如下所示：

- 首先执行同步代码，这属于宏任务
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 `setTimeout` 中的回调函数

微任务包括 `process.nextTick` ，`promise` ，`MutationObserver`，其中 `process.nextTick` 为 Node 独有。

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`。

注意，并不是微任务快于宏任务。而是宏任务中包括了 `script` ，浏览器会**先执行一个宏任务**，接下来有异步代码的话才会先执行微任务。

关于这方面更多的实例可以查看[这篇博客](https://juejin.im/post/5c148ec8e51d4576e83fd836)

### Node中的EventLoop

Node 的 Event Loop 分为 6 个阶段，它们会按照**顺序**反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

#### timer

timer阶段会执行setTimeout和setInterval回调，由poll阶段控制（在 Node 中定时器指定的时间也不是准确时间，只能是**尽快**执行。）

#### I/O

处理上一轮循环中少数未执行的I/O回调

#### idle,prepare

内部实现

#### poll

这一阶段中，系统会做两件事情

1. 回到 timer 阶段执行回调
2. 执行 I/O 回调

并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 poll 队列为空时，会有两件事发生
  - 如果有 `setImmediate` 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
  - 如果没有 `setImmediate` 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

#### check

check 阶段执行 `setImmediate`

####  close callbacks

close callbacks 阶段执行 close 事件



在以上的内容中，我们了解了 Node 中的 Event Loop 的执行顺序，接下来我们将会通过代码的方式来深入理解这块内容。

在有些情况下，定时器的执行顺序其实是**随机**的

```
setTimeout(() => {
    console.log('setTimeout')
}, 0)
setImmediate(() => {
    console.log('setImmediate')
})
```

对于以上代码来说，`setTimeout` 可能执行在前，也可能执行在后

- 首先 `setTimeout(fn, 0) === setTimeout(fn, 1)`，这是由源码决定的
- 进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 `setTimeout` 回调
- 那么如果准备时间花费小于 1ms，那么就是 `setImmediate` 回调先执行了



在某些情况下，他们的执行顺序一定是固定的，比如以下代码：

```
const fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
```

在上述代码中，`setImmediate` 永远**先执行**。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 `setImmediate` 回调，所以就直接跳转到 check 阶段去执行回调了。



上面介绍的都是 宏任务的执行情况，对于 微任务来说，它会在以上每个阶段完成前**清空**微任务队列，下图中的 Tick 就代表了 微任务。

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/EventLoop_03.jpg)

```javascript
setTimeout(() => {
  console.log('timer21')
}, 0)

Promise.resolve().then(function() {
  console.log('promise1')
})
```

对于以上代码来说，其实和浏览器中的输出是一样的，微任务永远执行在宏任务 前面。



Node 中的 `process.nextTick`，这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会**清空此队列中的所有回调函数**，并且优先于其他微任务执行。

```javascript
setTimeout(() => {
 console.log('timer1')

 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)

process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
```

对于以上代码，会先把 nextTick 全部打印出来。

### 总结

#### 宏任务

|                         | 浏览器 | Node |
| ----------------------- | ------ | ---- |
| `I/O`                   | ✅      | ✅    |
| `setTimeout`            | ✅      | ✅    |
| `setInterval`           | ✅      | ✅    |
| `setImmediate`          | ❌      | ✅    |
| `requestAnimationFrame` | ✅      | ❌    |

#### 微任务

|                              | 浏览器 | Node |
| ---------------------------- | ------ | ---- |
| `process.nextTick`           | ❌      | ✅    |
| `MutationObserver`           | ✅      | ❌    |
| `Promise.then catch finally` | ✅      | ✅    |

**process.nextTick是独有的一个队列，优先级高于promise.then等所有**



#### 最后几道练习题

先来一道最简单的：

```javascript
console.log('a');
setTimeout(() => {
    console.log('b');
}, 0);
console.log('c');
Promise.resolve().then(() => {
    console.log('d');
})
.then(() => {
    console.log('e');
});
console.log('f');

//输出是 a c f d e b
```

进入复杂模式：

```javascript
async function async1() {
  console.log('1')
  const data = await async2()
  console.log(data)
  console.log('2')
}

async function async2() {
  return new Promise(function (resolve) {
    console.log('3')
    resolve('await的结果')
  }).then(function (data) {
    console.log('4')
    return data
  })
}
console.log('5')

setTimeout(function () {
  console.log('6')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('7')
  resolve()
}).then(function () {
  console.log('8')
})
console.log('9')
// 输出：
// 5-1-3-7-9-4-8-await的结果-2-6
// 分析：
// 前面定义了俩async函数，直到console开始执行
// 1.控制台输出5
// 2.setTimeout进入下一轮事件循环
// 3.执行async1，输出1，进入等待，等待执行async2 的结果
//							   执行async2,promise立即执行，返回3，then进微任务队列1 async2 then
// 4.执行同步的promise,输出7， then进入微任务队列2 promise then
// 5.执行同步的控制台输出9
// 6.开始按顺序执行微任务，async2.then 输出 4；promise.then 输出 8
// 7.回到async1等待的位置，输出data(await的结果),输出2
// 8.执行setTimeout，输出6
```

超复杂模式：

```javascript
setTimeout(function () {
  console.log('1')
}, 0)

async function async1() {
  console.log('2')
  const data = await async2()
  console.log('3')
  return data
}

async function async2() {
  return new Promise(resolve => {
    console.log('4')
    resolve('async2的结果')
  }).then(data => {
    console.log('5')
    return data
  })
}

async1().then(data => {
  console.log('6')
  console.log(data)
})

new Promise(function (resolve) {
  console.log('7')
  resolve()
}).then(function () {
  console.log('8')
})
// 输出：
//2-4-7-5-8-3-6-async2结果-1

// 分析：
// setTimeout进入一下轮事件循环
// 1.执行async1，输出2，等待执行async2的结果，
// 					  执行async2，输出4，然后把 then 放入微任务队列 1.执行async2.then
// 2.执行同步的Promise，输出7，然后把then 放入微任务队列 2.执行执行promise.then
// 3.按输出执行微任务，执行saync2.then，输出5；执行promise.then 输出8
// 4.回到async1的awit 输出3
// 5.执行async1的then 输出6 输出data(async2的结果)
// 6.执行setTimeout 输出1
```

### 之前遇到的疑问好像还没解决

上面出现过的一个问题

```javascript
async function a(){
 	console.log("a1") 
 	const data = await b();
    	console.log("a2");
	console.log(data);
}
async function b(){
 	console.log("b");
	return "1";
}
a();
new Promise(resolve=>{
	console.log('promise');
	resolve()}
	).then(()=>{
		console.log("promise1");
	}).then(()=>{
		console.log( "promise2");
});

//这段代码在老版浏览器的输出顺序是
//a1 b promise promise1 promise2 a2 1
//但在新版浏览器的输出顺序是
//a1 b promise a2 1 promise1 promise2 
//感觉似乎有点违反规则
```

我又做了如下实验

```javascript
async function a(){
	console.log("a1");
	const data =await b();
	console.log("a2");
	console.log(data);
}
async function b(){
	return new Promise(function (resolve) {
        console.log('b');
	resolve();
  })
}
a();
new Promise(resolve=>{
    console.log("promise");
	resolve();
	}).then(()=>{
    	console.log("promise1")
	}).then(()=>{
    console.log("promise2")
});
//在老版浏览器中的结果：
//a1 b promise 
//a()返回了一个Promise，且状态是PENDING

//在新版浏览器中的结果：
//a1 b promise promise1 promise2 a2
//a()返回了一个Promise，状态是undefined
```

**exo me？？？？？**

所以从66-75版本，到底做了什么改变呢？？？

---更新----  

v8团队的说明我看到了，在73版本之后，就进行了这个更新，但可惜……我没太看懂。  
这个是V8团队文档的地址：[更快的异步函数和 Promise](https://v8.js.cn/blog/fast-async/)  
结论是:  
V8团队做了两个优化，使得awit变快了，并鼓励js开发者使用async和await替代手写的promise，以及坚持js引擎提供的原生promise实现，以避免在awit中使用额外的两个microtick。

对优化的内容，我着实没有看明白，只知道如果awit的回调函数里面手写了promise的话，它会在后面的promise.then之后再执行。如果里面没有promise，那就会先执行。  
= =  
这个结论我通过实验就已经试出来了好伐。

不过这并没有阻挡我继续探索的脚步，我在csdn上看到了这篇还不错的博客：[一次性弄懂EvnetLoop](https://blog.csdn.net/weixin_34259559/article/details/87951513)  

似乎这里有一个我看得懂的解释：  
区别在于RESOLVE(thenable)和Promise.resolve(thenable)  
文中是说，在73版本以下的谷歌浏览器中，传递给 await 的值被包裹在一个 Promise 中。然后，处理程序附加到这个包装的 Promise，以便在 Promise 变为 fulfilled 后恢复该函数，并且暂停执行异步函数，一旦 promise 变为 fulfilled，恢复异步函数的执行。那么这样的话，每个 await 引擎必须创建两个额外的 Promise（即使右侧已经是一个 Promise）并且它需要至少三个 microtask 队列 ticks。  

这篇文章引用了一个例子

```javascript
async function f() {
  await p
  console.log('ok')
}
```

可以被简化理解为：

```javascript 
function f() {
  return RESOLVE(p).then(() => {
    console.log('ok')
  })
}
```

如果 RESOLVE(p) 对于 p 为 promise 直接返回 p 的话，那么 p的 then 方法就会被马上调用，其回调就立即进入 job 队列。  
而如果 RESOLVE(p) 严格按照标准，应该是产生一个新的 promise，尽管该 promise确定会 resolve 为 p，但这个过程本身是异步的，也就是现在进入 job 队列的是新 promise 的 resolve过程，所以该 promise 的 then 不会被立即调用，而要等到当前 job 队列执行到前述 resolve 过程才会被调用，然后其回调（也就是继续 await 之后的语句）才加入 job 队列，所以时序上就晚了。

但是在73版本及之后的版本中：  
使用对PromiseResolve的调用来更改await的语义，以减少在公共awaitPromise情况下的转换次数。  
如果传递给 await 的值已经是一个 Promise，那么这种优化避免了再次创建 Promise 包装器，在这种情况下，我们从最少三个 microtick 到只有一个 microtick。

好像有点明白了。  
也就是说，当await回调函数里传给它的已经是一个Promise，那么就避免了再次创建，引擎也不再需要为await创造throwawayPromise。所以引擎什么都不需要做，安排 PromiseReactionJob 在 microtask 队列的下一个 tick 上恢复异步函数，暂停执行该函数，然后返回给调用者就好了。  

orz……虽说弄明白是咋回事了，但还是觉得……好复杂。
