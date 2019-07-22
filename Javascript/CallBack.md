## 回调函数

回调函数就是指一个函数，它作为变量传递给另一个函数，它在主题函数执行完之后执行。

举个栗子

```javascript
var friends=["Mike","Andy","Chitty","Bell"];
friends.forEach((item,index)=>{
	console.log(index+1+"."+item)
})
```

回调函数式可以多重的，比如ajax就是典型的栗子

```javascript
function successCallback(){
    //在发送之前做点什么
}    
 
function successCallback(){
  //在信息被成功接收之后做点什么
}
 
function completeCallback(){
  //在完成之后做点什么
}
 
function errorCallback(){
    //当错误发生时做点什么
}
$.ajax({
    url:"http://fiddle.jshell.net/favicon.png",
    success:successCallback,
    complete:completeCallback,
    error:errorCallback
 
});
```

## 回调函数的this

当回调函数是一个this对象的方法时，我们必须**改变执行回调函数**的方法来保证this对象的上下文。否则如果回调函数被传递给一个全局函数，this对象要么指向全局window对象，要么指向包含方法的对象。

举个复杂的栗子：

#### 箭头函数plus回调函数中的this

```javascript
let clientData = {
    id: '11111',
    fullName:"Not Set",
    setUserName: (firstName, lastName)=>{
        this.fullName = firstName + " " + lastName;
    }
}
let getUserInput=(firstName,lastName,callback)=>{
    //准备调用并存储fullName
	callback(firstName, lastName);
}
//调用
getUserInput("Chitty","Zhang",clientData.setUserName);
```

在这段代码里，箭头函数this是继承自父执行上下文，比如这里的箭头函数this.fullName，箭头函数本身所在的对象是clientData,而clientData的父执行上下文就是window,所以箭头函数的指向是window。

所以，结果并不是我们想的那样，而是：

```javascript
> clientData.fullName
"Not Set"
> window.fullName
"Chitty Zhang"
```

似乎这都是箭头函数带来的问题，跟回调函数似乎没什么关联。或许有人会问，会不会是因为你用的ES6**箭头函数**导致的呢？

#### 回调函数中的this

好的，那么用ES5再敲一遍……

```javascript
var clientData = {
    id: '11111',
    fullName:"Not Set",
    setUserName: function(firstName, lastName){
        this.fullName = firstName + " " + lastName;
    }
}
function getUserInput(firstName,lastName,callback){
	callback(firstName, lastName);
}
getUserInput("Chitty","Zhang",clientData.setUserName);
```

结果，好像并没有什么变化……

```javascript
> clientData.fullName
"Not Set"
```

实际上，getUserInput是全局函数，在 clientData.setUserName 执行时，this对象指向windows对象，所以在进一步的执行下，this一直是window。



**请注意！不要被结果误导！**这两种情况并不一样！

观察一下getUserInput的的this

ES5 的结果是：this：window

![callback_01.png](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/callback_01.png?raw=true)

但ES6的结果是：this：undefined

![callback_02.png](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/callback_02.png?raw=true)

虽然最终结果一样，但请记住，他们是有本质区别的！



#### 修复

我们可以用Call或者Apply函数来修复这个问题。

```javascript
//新传一个回调的对象callbackObj
let getUserInputUseApply=(firstname,lastname,callback,callbackObj)=>{
	 callback.apply(callbackObj, [firstname, lastname]);
}
//调用
//clientData对象会被Apply方法使用来设置为this对象
getUserInputUseApply("Chitty","Zhang",clientData.setUserName,clientData);
```

现在这个问题已经被修复了✿✿ヽ(°▽°)ノ✿

```javascript
> clientData.fullName
"Chitty Zhang"
```



## 体验一下回调函数的好处

在下面的过程中，实现以下功能：读取用户信息，用用户数据创建一个通用的句子，并且欢迎用户

```javascript
//通用句子，作为回调对象
let genericSentence=(name,gender)=>{
    let words=`${name} is the most funny ${gender} in the world.`;
    console.log(words);
}
//读取
let getUserInput=(firstName,lastName,gender,callback)=>{
    let fullName=`${firstName} ${lastName}`;
    if (typeof callback ==="function"){
        callback(fullName,gender);
    }
}
//调用
> getUserInput("Sarrans","Zhou","female",genericSentence)
Sarrans Zhou is the most funny female in the world.
```

因为getUserInput 函数仅仅只负责提取数据，我们可以把其他回调函数传递给它。

比如说我要实现"Hello,Mr./Ms. XXX",也可以使用它

```javascript
//先写个欢迎用户的
let welcome=(fullname,sex)=>{
    let male=sex&&sex==="man"?"Mr.":"Ms.";
    console.log(`Hello,${male} ${fullname}! Nice to meet you :)`);
}
//调用
> getUserInput("George","Chu","man",welcome)
Hello,Mr. George Chu! Nice to meet you :)
```

## 回调地狱

在执行异步代码时，无论以什么顺序简单的执行代码，经常情况会变成许多层级的回调函数堆积。它的根本问题在于：

- 嵌套函数存在耦合性，动一发则动全身
- 嵌套函数多了，难以处理错误

如何解决？思路有两：

1. 给你的函数命名并传递它们的名字作为回调函数，而不是主函数的参数中定义匿名函数。
2. 模块化L将你的代码分隔到模块中，这样你就可以到处一块代码来完成特定的工作。然后你可以在你的巨型应用中导入模块