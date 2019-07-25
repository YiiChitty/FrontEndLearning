## 深入理解Generator

Generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。

和普通函数的区别在于定义时有个\*号（由`function*`定义）,除了return语句，还可以用`yield`返回多次。

举个栗子来帮助理解吧。

实现一个0，1开头的斐波那契数列

```javascript
function fib(max){
    let a=0,b=1,arr=[0,1];
    while(arr.length<max){
        [a,b]=[b,a+b];
        arr.push(b);
    }
    return arr;
}
fib(5);
//控制台输出
 [0, 1, 1, 2, 3]
```

函数只能返回一次，所以必须返回一个Array。但如果用generator函数，就可以一次返回一个数，不断返回多次。

```javascript
function* fib(max){
    let a=0,b=1,n=0;
    while(n<max){
        yield a;
        [a,b]=[b,a+b]
        n++
    }
    return;
}
fib(5);
//控制台输出
▼ fib {<suspended>}
   __proto__: Generator
   [[GeneratorLocation]]: VM204:1
   [[GeneratorStatus]]: "suspended"
   [[GeneratorFunction]]: ƒ* fib(max)
   [[GeneratorReceiver]]: Window
   [[Scopes]]: Scopes[3]
```

`fib(5)`仅仅是创建了一个generator对象，还没有去执行它。

### 调用 generator

调用generator对象有两个方法：

- 一是不断地调用generator对象的`next()`方法

  `next()`方法会执行generator的代码，然后，每次遇到`yield x`就返回一个对象`{value: x, done: true/false}`，然后“暂停”。返回的`value`就是`yield`的返回值，`done`表示这个generator是否已经执行结束了。如果`done`为`true`，则`value`就是`return`的返回值。

  当执行到`done`为`true`时，这个generator对象就已经全部执行完毕，不要再继续调用`next()`了。否则一直都是` {value: undefined, done: true}`

  ```javascript
  let f = fib(5);
  f.next(); // {value: 0, done: false}
  f.next(); // {value: 1, done: false}
  f.next(); // {value: 1, done: false}
  f.next(); // {value: 2, done: false}
  f.next(); // {value: 3, done: false}
  f.next(); // {value: undefined, done: true}
  ```

- 二是用`for ... of`循环迭代generator对象，这种方式不需要我们自己判断`done`

  ```javascript
  for (var x of fib(10)) {
      console.log(x); 
  }
  // 控制台依次输出0, 1, 1, 2, 3, 5, 8...
  ```

就此，可以对Generator进行一个定义：

Generator函数是ES6提供的一种异步编程解决方案。**通过yield标识位和next()方法调用，实现函数的分段执行**。

### Generator的next()方法

```javascript
function* gen(x,y){
   	  let z= yield x+y;
   	  let result = yield z*x;
   	  return result
   }
var g = gen(5,6);
console.log(g.next());//{value: 11, done: false}
console.log(g.next());//{value: NaN, done: false}
```

1、第一执行next()，运行`yield x+y`，并返回x+y的运算结果11；

2、第二次执行next()，运行`yield z*x`,此时是z为11，x为5，运算结果为55才对，为何是NaN呢？

这是因为前一次运行yield x+y的值并没有保存，let z=yield x+y，结果是let z=undefined，所以运算z*x的结果是NaN。

解决这个问题:

```javascript
function* gen(x,y){
   	  let z= yield x+y;
   	  let result = yield z*x;
   	  return result
   }
var g = gen(5,6);
console.log(g.next());//{value: 11, done: false}
console.log(g.next(11));//{value: 55, done: false}
```

next方法中传入了参数11，此时得到正确的结果。next()方法是可以带参数的，其中的参数就替换了上一次yield执行的结果。在这个例子中yield x+y就替换成了11，let z=yield x+y 替换成了let z=11，所以结果正确了。

```javascript
function* gen(x,y){
   	  let z= yield x+y;
   	  let result = yield z*x;
   	  return result
   }
var g = gen(5,6);
var i =g.next();//{value: 11, done: false}
g.next(i.value);//{value: 55, done: false}
```

这样就解决了每次都计算的麻烦，无论上次运行什么结果，我们都可以作为下一次的值传入。

### Generator的return()方法

generator还有一种方法，就是return()，但它直接跳过所有的yield，直接执行完成，并返回输入的值。

```javascript
//还是上面的fib
let f=fib(5);
f.next();//{value: 0, done: false}
f.next();//{value: 1, done: false}
f.return(8);//{value: 8, done: true}
f.next();//{value: undefined, done: true}
```

### Generator函数的yield*表达式

```javascript
function* foo(){
   	yield "a";
   	yield "b";
   }
   function* gen(x,y){
   	  yield 1;
   	  yield 2;
   	  yield* foo();
   	  yield 3;
   }
var g = gen();
console.log(g.next());//{value: 1, done: false}
console.log(g.next());//{value: 2, done: false}
console.log(g.next());//{value: "a", done: true}
console.log(g.next());//{value: "b", done: true}
console.log(g.next());//{value: "3", done: true}

```

当执行yield*时，实际是遍历后面的Generator函数，等价于下面的写法：

```javascript
function* foo(){
   	yield "a";
   	yield "b";
}
function* gen(x,y){
	yield 1;
	yield 2;
	for(var value of foo()){
		yield value;
   	}
   	yield 3;
}

```

**注意：`yield*` 后面只能适配Generator函数.**

### 深入理解Generator yield和next()

我在看这个部分之前，做了这样一道题：

```javascript
function* foo(x){
    let y=2 *(yield(x+1));
    let z=yield(y/3);
    return x+y+z;
}
let it = foo(5);

//控制台执行并输出
it.next(1)
> {value: 6, done: false}
it.next(12)
> {value: 8, done: false}
it.next(13)
> {value: 42, done: true}

```

这个输出似乎蛮奇怪的……

不过不要紧，分析完整个过程，或许就能对yield有更明晰的理解了。

首先，第一次next()的时候，传参被忽略，函数执行被暂停在了(x+1)，所以返回了5+1=6，这没什么问题。

> 首次执行next()传参被忽略或许有点难理解，但可以想一想，给next()传递的参数是上一个yield的返回值，初次执行的时候并没有前一个yield，所以就被忽略了。
>
> 用代码验证一下
>
> ```javascript
> function* testFirtNext(m){
> 	let n = yield m;
> 	console.log(n);
> }
> let x=testFirstNext(10);
> 
> x.next(6)
> >{value: 10, done: false}
> x.next()
> >undefined
> >{value: undefined, done: true}
> 
> ```
>
> 所以看到了吗，如果不给yield传值，它就会返回undefined！
>
> 这样是不是就很好理解了呢

第二次next()的时候，传递的参数等于上一个yield的返回值，所以继续往下执行：y=2*12=24。函数停在下一个位置(y/3)，所以返回8。

第三次next()的时候，继续执行yield的返回值13，所以z=13。此时执行到函数终点返回x+y+z=5+24+13=42。

看到这里，应该对yield和next()有比较深刻的认知了。



接下来，我们来看一个比较复杂的调用，它会是怎样的一个输出顺序呢？

```javascript
function test1(arg) {
	setTimeout(function() {
        it.next(arg);
    	console.log('test1内部');
	}, 0)
}
function test2() {
	setTimeout(function() {
		it.next('yyy')
	}, 0)
}
function* gen() {
	var a = yield test1('xxx');
	console.log(a);
	var b = yield test2();
	console.log(b);
}
var it = gen();

//控制台执行并输出
it.next();
> {value: undefined, done: false}
> xxx
> test1内部
> yyy
it.next();
> {value: undefined, done: true}

```

好像很混乱的样子……

不要紧，我们来分析一下过程。

1.执行next()之后，碰到第一个field，**函数停在 `test1('xxx')`**，触发test1函数，传入参数。此时返回filed的结果，并没有参数 (undefined)。

1.1在test1内部时，**执行`it.next('xxx')`**：  
此时函数从**上次停止的地方继续执行**，将值'XXX'赋值给a，随后控制台输出a的内容。  
接着向下执行，又碰到一个field，**暂停在test2()**。

1.2继续执行test1内部的下一条，控制台输出。完成之后才触发test2（）

在test2内部，**执行it.next('yyy')**:  
**从上次停止的地方开始继续执行**,将值‘yyy'赋值给b，随后控制台输出b的内容。

2.到现在为止，函数已经执行完了，这时候执行next()，就会是已完成的结果了。



看完上面这个例子，应该对next()的执行机制有非常深刻的理解了。执行next()就先去找之前暂停在哪里，然后从那里开始执行，直到遇到下一次的暂停为止。暂停时，如果会触发函数，需要等之前的操作完成之后才会触发。



理解了这个，就可以活学活用了。比如说写一个无限迭代器,每次调用自加1。

之前写的话，自然而然就想到了闭包。

```javascript
function add1forever(){
    let i=1;
    return ()=>{
        return i++;
    }
}
let a=add1forver();

//控制台输出
a();
>1
a();
>2
a();
>3

```

那么用generator要怎么实现呢?

```javascript
function* add1forever(){
    let i=1;
    while(true){
        return yield i++;
    }
}
//定义一个迭代器
let a=add1forever();

//控制台
a.next();
>{value: 1, done: false}
a.next();
>{value: 2, done: false}

```

在这个无限迭代器中，当首次碰到yield的时候，返回了i的初始值1。generator是个迭代器，不会销毁执行上下文，所以yield 保存了i的值，下一次执行的时候将从这里继续执行+1，进入到while(true)这个无限循环中，碰到yield，输出i的值就是2了。

或许不太理解的是为什么返回了1而不是i++之后的结果，因为i++相当于是i=1；i=i+1。那么while内的循环其实是这样的：

```javascript
yield i=1;
i=i+1;
return i;
```

当然了，如果写的是++i，那首次返回的value值就应该是2了。

但实现这个功能用它是无法实现的，因为它并不能记住 i 的值，它的内部等价于这个：

```javascript
i=yield (1+1);
return i;
```

### 和普通函数比，有何用

Generator的特点，一句话概括就是：**可以随心所欲的交出和恢复函数的执行权**，yield交出执行权，next()恢复执行权。

因为generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，写一个generator就可以实现需要用面向对象才能实现的功能。

generator还有另一个巨大的好处，就是把异步回调代码变成“同步”代码。

没有generator之前的黑暗时代，用Ajax时需要这么写代码：

```javascript
ajax('http://url-1', data1, function (err, result) {
    if (err) {
        return handle(err);
    }
    ajax('http://url-2', data2, function (err, result) {
        if (err) {
            return handle(err);
        }
        ajax('http://url-3', data3, function (err, result) {
            if (err) {
                return handle(err);
            }
            return success(result);
        });
    });
});

```

回调越多，代码越难看。

有了generator的美好时代，用AJAX时可以这么写：

```javascript
try {
    r1 = yield ajax('http://url-1', data1);
    r2 = yield ajax('http://url-2', data2);
    r3 = yield ajax('http://url-3', data3);
    success(r3);
}
catch (err) {
    handle(err);
}
```

看上去是同步的代码，实际执行是异步的。

### 实例

这个部分的实例来源自这篇博客：[链接](https://blog.csdn.net/tcy83/article/details/80427195)

#### 1.协程工作

比如说A，B两个线程根据实际逻辑控制共同完成某个任务，A运行一段时间后，暂缓执行，交由B运行，B运行一段时间后，再交回A运行，直到运行任务完成。对于JavaScript单线程来说，我们可以理解为函数间的协作，由多个函数间相互配合完成某个任务。

比如：

肚包鸡的过程：准备工作->炒鸡->炖鸡->上料->上桌

大厨很忙，负责核心的工序：炒鸡，上料

伙计负责没有技术含量，只有工作量的打杂工序：准备工作，炖鸡，上桌

```javascript
//大厨的活
function* chef(){
	console.log("fired chicken");//炒鸡
	yield "worker";//交由伙计处理
	console.log("sdd ingredients");//上料
	yield "worker";//交由伙计处理
}
//伙计的活
function* worker(){
	console.log("prepare chicken");//准备工作
	yield "chef";//交由大厨处理
	console.log("stewed chicken");
	yield "chef";//交由大厨处理
	console.log("serve chicken");//上菜
}
var ch = chef();
var wo = worker();
//流程控制
function run(gen){
	var v = gen.next();
	if(v.value =="chef"){
		run(ch);
    }else if(v.value =="worker"){
		run(wo);
	}
}
run(wo);//开始执行

```

按照大厨和伙计的角色，分别创建了两个Generator函数，chef和worker。函数中列出了各自角色要干的活，当要转交给其他人任务时，利用yield，暂停执行，并将执行权交出；run方法实现流程控制，根据yield返回的值，决定移交给哪个角色函数。相互配合，直到完成整个过程。

#### 2.异步编程

Generator函数，官方给的定义是"Generator函数是ES6提供的一种异步编程解决方案"。它解决异步编程的两大问题

- 回调地狱
- 异步流控

回调地狱不用多说了，函数层层调用，互相耦合。

那什么是异步的流控呢？简单说就是**按顺序控制异步操作**。

以上面的肚包鸡为例，每个工序都是可认为异步的过程，工序之间又是同步的控制(上一个工序完成后，才能继续下一个工序)，这就是异步流控。

接下来我们从工序的角度，从普通方法实现肚包鸡的制作过程：

```javascript
setTimeout(function(){
   console.log("prepare chicken");
   setTimeout(function(){
      console.log("fired chicken");
      setTimeout(function(){
         console.log("stewed chicken");
         ....
       },500)
   },500)
},500);

```

 用setTimeout方法来模拟异步过程，这种层层嵌套就是回调地狱。

接下来用generator实现这个过程：

```javascript
//准备
function prepare(sucess){
	setTimeout(function(){
		console.log("prepare chicken");
		sucess();
    },500)
}
//炒鸡
function fired(sucess){
	setTimeout(function(){
		console.log("fired chicken");
		sucess();
	},500)
}
//炖鸡
function stewed(sucess){
	setTimeout(function(){
		console.log("stewed chicken");
		sucess();
	},500)
}
//上料
function sdd(sucess){
	setTimeout(function(){
		console.log("sdd chicken");
		sucess();
	},500)
}
//上菜
function serve(sucess){
	setTimeout(function(){
		console.log("serve chicken");
		sucess();
	},500)
}
 
//流程控制
function run(fn){
	const gen = fn();
    function next() {
        const result = gen.next();
        if (result.done) return;
        // result.value就是yield返回的值，是各个工序的函数
        result.value(next);//next作为参数传入，本工序成功后，执行下一工序
	}
    next();
};
//工序
function* task(){
	yield prepare;
	yield fired;
    yield stewed;
    yield sdd;
    yield serve;
}
run(task);//开始执行

```

我们分析下执行过程：

1、每个工序对应一个独立的函数，在task中组合成工序列表，执行时将task作为入参传给run方法。run方法实现工序的流程控制。

 2、首次执行next()方法，gen.next()的value，即result.value返回的是prepare函数对象，执行result.value(next)，即执行prepare(next)；prepre执行完成后，继续调用其入参的next，即下一步工序，

3、以此类推，完成整个工序的实现。

从上面例子看，task方法将各类工序"扁平化",解决了层层嵌套的回调地狱；run方法，使各个工序同步执行，实现了异步流控。