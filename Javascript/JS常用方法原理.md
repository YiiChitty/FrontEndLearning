# JS常用方法原理

这一部分试图研究一些常用方法的原理，将尝试用原生的js去实现这些方法，一方面加深对这些方法的理解，另一方面是为面试手写源码做的准备。

## call、apply、bind

以上这三种方法都是Function.prototype下的方法，均用于改变函数运行时上下文（this的指向）。

call和apply作用都是相同的，只是传参的方式不同。除了第一个参数外，call可以接收一个参数列表，apply只接受一个参数数组。

bind和其他两个方法作用也是一致的，只是该方法会返回一个函数。

### 实现call

1.不传入第一个参数时，默认为window

2.改变了 this 指向，让新的对象可以执行该函数（给新对象添加一个函数，执行完之后删除）

```javascript
Function.prototype.myCall=function(context){
    if(typeof this !=='function'){
        throw new TypeError('error');
    }
    var context=context||window;
    context.fn=this;
    var args=[...arguments].slice(1);
    //getValue.call(a,'xxx','xxx')=>a.fn('xxx','xxx')
    var result=context.fn(...args);
    delete context.fn;
    return dalete;
}
```

### 实现Apply

```javascript
//思路一致
Function.prototype.apply()=function(context){
    if(typeof this !=='function'){
        throw new TypeError('error');
    }
    context=context||window;
    context.fn=this;
    let result;
    //参数处理有区别,第二个参数是一个数组
    if(arguments[1]){
        result=context.fn(...arguments[1]);
    }else{
        result=context.fn();
    }
    delete context.fn;
    return result;
}
```

### 实现Bind

因为bind返回的是一个函数，所以需要判断边界，复杂一些。

```javascript
Function.prototype.myBind=function(context){
	if (typeof this !== 'function') {
    	throw new TypeError('error');
    }
    const _this=this;
    const args=[...arguments].slice(1);
    return function F(){
        // new 函数，不动this
        if (this instanceof F){
            return new _this(...args,...arguments);
        }
        return _this.apply(context,args.concat(...arguments));
    }
}
```

- bind返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 new的方式，我们先来说直接调用的方式
- 对于直接调用来说，这里选择了 apply 的方式实现，但是对于参数需要注意以下情况：因为 bind可以实现类似这样的代码 `f.bind(obj, 1)(2)`，所以我们需要将两边的参数拼接起来，于是就有了这样的实现 `args.concat(...arguments)`
- 对于 `new` 的情况来说，不会被任何方式改变 `this`，所以对于这种情况我们需要忽略传入的 `this`

## new

首先，先聊一下关于new的作用：

写了一个例子

```javascript
function Test(name){
    this.name=name;
}
Test.prototype.sayName=function(){
    console.log(this.name)
}
const t=new Test('Chitty')

//控制台输出
t.name
> 'Chitty'
t.sayName();
> 'Chitty'
```

- **new 通过构造函数 Test 创建出来的实例可以访问到构造函数中的属性**
- **new 通过构造函数 Test 创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过 new操作符，实例与构造函数通过原型链连接了起来**

但是这个构造函数Test并没有返回任何值,试一下返回值会怎么样：

```javascript
function Test(name){
    this.name=name;
    return 1;
}
const t=new Test('Chitty')

//控制台输出
t.name
> 'Chitty'
```

- **构造函数如果返回原始值，那么这个返回值毫无意义**

如果返回对象呢？

```javascript
function Test(name){
    this.name=name;
    return {name:'zy'}
}
const t=new Test('Chitty')

//控制台输出
t
> {name:'zy'}
t.name
> 'zy'
```

虽然构造函数内部的 `this` 还是依旧正常工作的，但是当返回值为对象时，这个返回值就会被正常的返回出去。

- **构造函数如果返回值为对象，那么这个返回值会被正常使用**

**tips:**所以，在使用构造函数的时候，尽量不要写返回值!原始值不生效，返回对象那new就没有作用了。

### 实现new

在调用new的时候会发生这些事情：

1.内部新生成一个对象

2.链接到原型

3.绑定this（对象=构造函数的this）

4.返回新对象(原始值忽略，但对象要正常处理)

试着实现一下：

```javascript
function create(con,...args){
    let obj={};
    obj._proto_=con.prototype;
    //绑定this并执行构造函数
    let result=con.apply(obj,args);
    return result instanceof Object? result:obj
}
```

一步步剖析一下过程：

1. 首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
2. 然后内部创建一个空对象 `obj`
3. 因为 `obj` 对象需要访问到构造函数原型链上的属性，所以需要把两者联系起来。
4. 将 `obj` 绑定到构造函数上，并且传入剩余的参数
5. 判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 `obj`，这样就实现了忽略构造函数返回的原始值

## instanceof原理

instanceof可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

尝试实现一下：

```javascript
function myInstanceof(left,right){
    let prototype=right.prototype;
    left=left._proto_;
    while(true){
        if(left===null||left===undefined) return false;
        if(prototype===left) return true;
        left=left._proto_;
    }
}
```

步骤和思路：

- 首先获取类型的原型
- 然后获得对象的原型
- 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 `null`，因为原型链最终为 `null`

## 多参数柯里化

```js
function progressCurrying(fn,args){
    var _this=this;
    var len=fn.length;
    var args=args||[];
    return function (){
        var _args=Array.prototype.slice.call(arguments).concat(args);
        //参数个数小于最初的fn.length，则继续递归调用
        if(_args.length<len){
            return progressCurrying.call(_this,fn,args);
        }
        return fn.apply(this,_args);
    }
}
```

