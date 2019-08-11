# JS面试准备

## 1.基本数据类型

6种，boolean，number，string，undefined，null，symbol

## 2.null是Object吗

虽然 typeof null会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## 3.原始类型与对象类型区别

对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址。

当创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。

## 4.typeof vs instanceof

typeof对于原始类型来说，除null会显示成object，其余都可以显示正确的类型typeof 对于对象来说，除了函数都会显示 object，所以说typeof并不能准确判断变量到底是什么类型。

如果我们想判断一个对象的正确类型，这时候可以考虑使用 instanceof，因为内部机制是通过原型链来判断的。



## 5.==比较

- Boolean，number，string三类比较的时候把值转换成数字，在看转换结果是否相等。证明：（'1'==true) 是真 （'abc'==true）是假。
- undefined 参与比较，换成了NaN,所以其他三个类型跟它比较都是false，跟null类型比较的时候是true。（NaN==NaN)是假
- null参与比较，被当成对象，因为null没有valueof和toString，除了undefined谁跟他比较都是false。
- 值类型与对象比较：先调用对象valueof  如果仍返回对象，调用tostring，如果还是没有就不等。

## 6.如何给元素添加事件

- 在HTML元素中绑定事件 onclick=show()
- 获取dom，dom.onclick
- addEventListener(click,show,1/0)

## 7.addEventListener三个参数，取值意思

第一个参数是事件类型，第二个是事件发生的回调函数，第三个是个布尔值，默认是false，false是冒泡阶段执行，true是捕获阶段。

## 8.事件冒泡与事件捕获

事件是先捕获，后冒泡

捕获阶段是外部元素先触发然后触发内部元素

冒泡阶段是内部元素先触发然后触发外部元素

## 9.如何阻止事件冒泡？如何取消默认事件？如何阻止事件的默认行为？

- 阻止事件冒泡：

  W3C: stopPropagation();

  IE: e.cancelBubble=true;

  写法 :

  window.event ? window.event.cancelBubble=true:e.stop(Propagation)

- 取消默认事件

  W3C：preventDefault()

  IE: e.returnValue:false;

- 阻止默认行为：

  return false 

  原生的js会阻止默认行为，但会继续冒泡；

  jquery会阻止默认行为，并停止冒泡。



## 10.如何判断一个对象类型是数组

- 根据构造函数来判断 xxx instanceof Array 
- 根据class属性判断 Object.prototype.toString.call(obj)==='[object Array]'
- 直接用isArray判断



## 11.怎么判断一个属性是对象上的属性还是其原型对象上的属性

使用hasOwnProperty()返回true，说明是这个对象上的；如果返回false，但是属性in 这个对象返回了true，说明是原型对象上的属性。如果都是false，那么不存在这个属性。



## 12.闭包、作用域链

作用域链针对函数作用域来说的，比如创建了一个函数，函数里面又包含了一个函数，那么就会有全局作用域、函数1的作用域、函数2的作用域。

它的查找规范就是现在自己的变量范围中找，如果找不到就沿着作用域往上找。

闭包就是能够读取其他函数内部变量的函数，其实就是利用了作用域链向上查找的特点。

闭包的作用：读取函数内部变量    让这些变量的值一直保持在内存中。

## 13.原型链

原型链是针对构造函数来说的，比如先创建了一个函数，然后通过变量a new了这个函数，那么new出来的函数就会继承出来的那个函数的属性。如果我访问这个新函数的某个属性，如果没有在新函数中定义这个变量，它就会往上查找。这个过程就是原型链。

## 14. 继承的原理

还是跟原型链有关。每个函数都有个原型对象，这个对象用来存储通过这个函数所创建的所有实例的共有属性和方法。在读取某个对象属性的时候，从实例开始，如果实例有就返回，如果没有就找原型对象，找到了就返回。通过实例只能访问原型对象里的值，但是不能修改。这就实现了继承。

## 15.Promise

Promise是一种用于解决异步问题的思路、方案，简单说是个容器，里面存的是某个未来会结束的结果。是一个对象，可以获取异步操作的消息。有三种状态，pending resolved rejected ,状态变了就不能修改了。

在js里面，经常用异步的是ajax，比如sucess：一个回调，error一个回调。但是如果一次请求需要多个接口的时候就产生了回调地狱，promise可以用then来处理，它可以在一个then里面再写一个promise对象。

promise.all 多任务并行，输出失败的那个，如果成功，返回所有的执行结果。

promise.race 多任务执行，返回最先执行结束的任务结果。

## 16 Generator+yield

是ES6里面的新数据类型，像一个函数，可以返回多次。特点就是函数有个*号。

调用的话就是不断调用next()  返回当前的value 值 done的状态

return() 直接忽略所有yield ，返回最终的结果

可以随心所欲的交出和恢复函数的执行权。



## 17.await+async

async函数返回的是一个promise对象，await用于等待一个async函数的返回值。

优势在于处理then链。如果是多个Promise组成的then链，那么优势就比较明显了，可以用Promise来解决多层回调的题，可以进一步优化它。



## 18.EventLoop

浏览器执行是有一个执行栈的，当遇到异步的代码时，会被挂起并在需要执行的时候加入到task队列里面，一旦执行栈为空，eventloop会从Task队列里拿出需要执行的代码放入执行栈中执行。执行完毕后就弹出。

但是不同的任务源会分到微任务和宏任务里面。

顺序：

首先执行同步代码，属于宏任务

执行完所有宏任务之后，查询有没有异步代码需要执行，然后执行微任务

执行微任务之后，如果有必要会重新渲染页面

然后一下轮执行宏任务中异步代码，比如说setTimeout的回调函数。



## 19.数组API有哪些？

直接修改原数组的：push(),unshift(),  pop(),shift(), splice() ,reverse(), sort()  fill(x,start,end) copyWithin(tochangeindex,changestart,changeend)

返回新数组的： concat(),slice()

返回字符串： join()

位置或是否在数组内： indexOf() lastindexOf() includes()是否包括 find()满足条件的索引;

遍历方法：forEach()所有元素执行一次，返回undefined;map()返回值新数组;filter()返回通过元素的新数组 ;every()所有都满足返回true;some()只要有一个元素满足就返回true；reduce(fn(pre,cur,index,arr),basevalue)累加器;reduceRight()从右边往左边加

迭代器：arr.keys()返回索引迭代器；arr.values()返回迭代器，值；arr.entries()返回键值对。



## 20.sort方法底层如何排序？

谷歌浏览器：大于22的数组 快排；小于22的用插入排序

火狐浏览器：归并排序

webkit：用的c++的qsort();



## 21. 模块化CommonJS AMD CMD ES6Module的区别

CommonJS 一个单独的文件就是一个模块，主要运行与服务器端，同步加载模块。require输入其他模块提供的功能，module.exports规范模块对外接口，输出一个值的拷贝。输出之后不能改变，会缓存起来。

AMD 异步加载，一个单独文件一个模块，主要运行于浏览器端，模块和模块的依赖可以被异步加载。define定义模块，require用于输入其他模块提供的功能，return规范模块对外接口，define.amd是一个对象，表明函数遵守AMD规范。AMD的运行逻辑是，提前加载，提前执行，申明依赖模块的时候，会第一时间加载并执行模块内的代码，使后面的回调函数能在所需的环境中运行。

CMD 通用模块。一个文件一个模块。主要在浏览器中运行，define全局函数，定义模块，通过exports向外提供接口，用require获取接口，使用某个组件时用use()调用。通过require引入的模块，只有当程序运行到这里时候才会加载执行。

UMD 通用模块。解决commonJS和AMD不能通用的问题。define.amd存在，执行AMD规范；module.exports,执行CommonJS规范；都没有，原始代码规范。