# JS基础

## 原始类型

- `boolean`
- `null`
- `undefined`
- `number`
- `string`
- `symbol`

## null是Object吗？

虽然 `typeof null` 会输出 `object`，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## 对象类型

常见面试题：

```javascript
function test(person) {
  person.age = 24
  person = {
    name: 'MA',
    age: 22
  }

  return person
}
const p1 = {
  name: 'Geroge',
  age: 23
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

答案是：{'Geroge','24'} {'MA','22'}

- 首先，函数传参是传递对象指针的副本
- 到函数内部修改参数的属性这步，我相信大家都知道，当前 `p1` 的值也被修改了
- 但是当我们重新为 `person` 分配了一个对象时就出现了分歧
- 所以最后 `person` 拥有了一个新的地址（指针），也就和 `p1` 没有任何关系了，导致了最终两个变量的值是不相同的。



## 原始类型与对象类型不同之处

对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。

## typeof vs instanceof

`typeof` 对于原始类型来说，除了 `null` 会显示成null，其余都可以显示正确的类型

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
```

`typeof` 对于对象来说，除了函数都会显示 `object`，所以说 `typeof` 并不能准确判断变量到底是什么类型。

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

如果我们想判断一个对象的正确类型，这时候可以考虑使用 `instanceof`，因为内部机制是通过原型链来判断的，在后面的章节中我们也会自己去实现一个 `instanceof`。

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```

对于原始类型来说，想直接通过 `instanceof` 来判断类型是不行的，但改一下 `instanceof`还是可以 判断原始类型的：

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```

 `Symbol.hasInstance` 是一个能让我们自定义 `instanceof` 行为的东西，以上代码等同于 `typeof 'hello world' === 'string'`，所以结果自然是 `true` 了。

这其实也侧面反映了一个问题， `instanceof` 也不是百分之百可信的。

## 类型转换？

首先我们要知道，在 JS 中类型转换只有三种情况，分别是：

- 转换为布尔值
- 转换为数字
- 转换为字符串

### 转Boolean

在条件判断时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象。

### 对象转原始类型

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：

- 如果已经是原始类型了，那就不需要转换了
- 如果需要转字符串类型就调用 `x.toString()`，转换为基础类型的话就返回转换的值。不是字符串类型的话就先调用 `valueOf`，结果不是基础类型的话再调用 `toString`
- 调用 `x.valueOf()`，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错

当然可以重写 `Symbol.toPrimitive` ，该方法在转原始类型时调用优先级最高。

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```

### 四则运算符

加法运算符不同于其他几个运算符，它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```js
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"
```

如果你对于答案有疑问的话，请看解析：

- 对于第一行代码来说，触发特点一，所以将数字 `1` 转换为字符串，得到结果 `'11'`
- 对于第二行代码来说，触发特点二，所以将 `true` 转为数字 `1`
- 对于第三行代码来说，触发特点二，所以将数组通过 `toString` 转为字符串 `1,2,3`，得到结果 `41,2,3`

另外对于加法还需要注意这个表达式 `'a' + + 'b'`

```
'a' + + 'b' // -> "aNaN"
```

因为 `+ 'b'` 等于 `NaN`，所以结果为 `"aNaN"`。



对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

```js
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN
```

### 比较运算符

1. 如果是对象，就通过 `toPrimitive` 转换对象
2. 如果是字符串，就通过 `unicode` 字符索引来比较

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  }
}
a > -1 // true
```

在以上代码中，因为 `a` 是对象，所以会通过 `valueOf` 转换为原始类型再比较值。



## this

我们先来看几个函数调用的场景

```js
function foo() {
  console.log(this.a)
}
var a = 1
foo();

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

const c = new foo()
```

接下来我们一个个分析上面几个场景

- 对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是 `window`
- 对于 `obj.foo()` 来说，我们只需要记住，**谁调用了函数，谁就是 `this`**，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象
- 对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`

说完了以上几种情况，其实很多代码中的 `this` 应该就没什么问题了。

下面让我们看看箭头函数中的 `this`

```js
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())
```

首先箭头函数其实是没有 `this` 的，**箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`**。在这个例子中，因为包裹箭头函数的第一个普通函数是 `a`，所以此时的 `this` 是 `window`。另外**对箭头函数使用 `bind`这类函数是无效的**。

最后种情况也就是 `bind` 这些改变上下文的 API 了，对于这些函数来说，`this` 取决于第一个参数，如果第一个参数为空，那么就是 `window`。

那么说到 `bind`，**如果对一个函数进行多次 `bind`，那么上下文会是什么**呢？

```js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?
```

如果认为输出结果是 `a`，那么就错了。

其实可以把上述代码转换成另一种形式：

```js
// fn.bind().bind(a) 等价于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```

可以从上述代码中发现，不管我们给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定，所以结果永远是 `window`。



以上就是 `this` 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据**优先级**最高的来决定 `this` 最终指向哪里。

**首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。**



## ==与===

对于 `==` 来说，如果对比双方的类型**不一样**的话，就会进行**类型转换**。

假如我们需要对比 `x` 和 `y` 是否相同，就会进行如下判断流程：

1. 首先会判断两者类型是否**相同**。相同的话就是比大小了

2. 类型不相同的话，那么就会进行类型转换

3. 会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`

4. 判断两者类型是否是string和number，是的话就会将字符串转换为number

   ```js
   1 == '1'
         ↓
   1 ==  1
   ```

5. 判断其中一方是否为boolean，是的话就会把boolean转为number再进行判断

   ```js
   '1' == true
           ↓
   '1' ==  1
           ↓
    1  ==  1
   ```

6. 判断其中一方是否object且另一方为string、number或者symbol，是的话就会把object转为原始类型再进行判断

   ```js
   '1' == { name: 'xxx' }
           ↓
   '1' == '[object Object]'
   ```

**现在来想想[]==![]输出什么？**

首先先执行的是![]，它会得到false。

然后[]==false，返回true。

**那么[]==[],{}=={}又输出什么呢？**

类型一致，它们是引用类型，地址是不一样的，所以为false!



对于 `===` 来说就简单多了，就是判断两者类型和值是否相同。



更多的对比可以阅读这篇 [文章](https://felix-kling.de/js-loose-comparison/) 或者 [标准文档](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.1)



## 闭包

闭包的定义其实很简单：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。

```js
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A();
B(); // 1
```

很多人对于闭包的解释可能是函数嵌套了函数，然后返回一个函数。其实这个解释是不完整的，就比如我上面这个例子就可以反驳这个观点。

在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。

来看一道经典题目吧：

使用闭包解决var定义函数问题：

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

因为 `setTimeout` 是个异步函数，所以会先把循环全部执行完毕，这时候 `i` 就是 6 了，所以会输出一堆 6。

解决办法有三种，第一种是**使用闭包的方式**

```js
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i);
}
```

在上述代码中，我们首先使用了立即执行函数将 `i` 传入函数内部，这个时候值就被固定在了参数 `j` 上面不会改变，当下次执行 `timer` 这个闭包的时候，就可以使用外部函数的变量 `j`，从而达到目的。

第二种就是**使用 `setTimeout` 的第三个参数**，这个参数会被当成 `timer` 函数的参数传入。

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

第三种就是**使用 `let` 定义 `i` **了来解决问题了，这个也是最为推荐的方式

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```



## 深浅拷贝

在前面，已经说到了对象类型在赋值过程中其实是复制了地址，从而导致了改变一方另一方也都被改变的情况。

```js
let a = {
  age: 1
}
let b = a
a.age = 2
console.log(b.age) // 2
```

比如上面这样的。但我们其实是不希望出现这个问题的。这时候就可以用深浅拷贝来解决了。

### 浅拷贝

首先可以通过 `Object.assign` 来解决这个问题，`Object.assign` 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址。

```js
let a = {
  age: 1
}
let b = Object.assign({}, a)
a.age = 2
console.log(b.age) // 1
```

另外我们还可以通过展开运算符 `...` 来实现浅拷贝

```js
let a = {
  age: 1
}
let b = { ...a }
a.age = 2
console.log(b.age) // 1
```

通常浅拷贝就能解决大部分问题了，但是当我们遇到如下情况就可能需要使用到深拷贝了:

```js
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first) // native
```

浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么就又回到最开始的话题了，两者享有相同的地址。要解决这个问题，我们就得使用深拷贝了。

接下来就来说深拷贝

### 深拷贝

这个问题通常可以通过 `JSON.parse(JSON.stringify(object))` 来解决。

```js
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = JSON.parse(JSON.stringify(a))
a.jobs.first = 'native'
console.log(b.jobs.first) // FE
```

但是**该方法也是有局限性**的：

- 会忽略 `undefined`
- 会忽略 `symbol`
- 不能序列化函数
- 不能解决循环引用的对象

> 我们来试一下这个方法：
>
> ```js
> let obj = {
>   a: 1,
>   b: {
>     c: 2,
>     d: 3,
>   },
> }
> obj.c = obj.b
> obj.e = obj.a
> obj.b.c = obj.c
> obj.b.d = obj.b
> obj.b.e = obj.b.c
> let newObj = JSON.parse(JSON.stringify(obj))
> console.log(newObj)
> ```
>
> 如果你有这么一个循环引用对象，你会发现并不能通过该方法实现深拷贝。
>
> 它会报错：Uncaught TypeError: Converting circular structure to JSON
>
> 在遇到函数、 `undefined` 或者 `symbol` 的时候，该对象也不能正常的序列化
>
> ```js
> let a = {
>   age: undefined,
>   sex: Symbol('male'),
>   jobs: function() {},
>   name: 'xxx'
> }
> let b = JSON.parse(JSON.stringify(a))
> console.log(b) // {name: "xxx"}
> ```
>
> 你会发现在上述情况中，该方法会忽略掉函数和 `undefined` 。

在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题。

如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 `MessageChannel`

```js
function structuralClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}

var obj = {
  a: 1,
  b: {
    c: 2
  }
}

obj.b.d = obj.b

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
const test = async () => {
  const clone = await structuralClone(obj)
  console.log(clone)
}
test()
```

实现一个深拷贝，但是其实实现一个深拷贝是很困难的，需要我们考虑好多种边界情况，比如原型链如何处理、DOM 如何处理。

这个地方写一个简化版的深拷贝

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

测试一下

```javascript
let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```

## 原型

每个 JS 对象都有 `__proto__` 属性，这个属性指向了原型。这个属性在现在来说已经不推荐直接去使用它了，这只是浏览器在早期为了让我们访问到内部属性 `[[prototype]]` 来实现的一个东西。

原型也是一个对象，并且这个对象中包含了很多函数，所以我们可以得出一个结论：对于 `obj` 来说，可以通过 `__proto__` 找到一个原型对象，在该对象中定义了很多函数让我们来使用。

原型的 `constructor` 属性指向构造函数，构造函数又通过 `prototype` 属性指回原型，但是并不是所有函数都具有这个属性，`Function.prototype.bind()` 就没有这个属性。

接下来就是经典的那张原型图登场了：

![原型](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/JSBase_01.jpg)



接下来，说一下原型链

原型链就是多个对象通过 `__proto__` 的方式连接了起来。为什么 `obj` 可以访问到 `valueOf` 函数，就是因为 `obj` 通过原型链找到了 `valueOf` 函数。

对于这一小节的知识点，总结起来就是以下几点：

- `Object` 是所有对象的爸爸，所有对象都可以通过 `__proto__` 找到它
- `Function` 是所有函数的爸爸，所有函数都可以通过 `__proto__` 找到它
- 函数的 `prototype` 是一个对象
- 对象的 `__proto__` 属性指向原型， `__proto__` 将对象和原型连接起来组成了原型链



更多内容可以参考

[深度解析原型中的各个难点](https://github.com/KieSun/Dream/issues/2)

[JS深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)