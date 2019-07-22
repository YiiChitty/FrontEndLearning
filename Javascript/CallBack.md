## 回调函数

回调函数就是指一个函数，它作为变量传递给另一个函数，它在主题函数执行完之后执行。

举个栗子

```javascript
var friends=["Mike","Andy","Chitty","Bell"];
friends.forEach((item,index)=>{
	console.log(index+1+"."+item)
})
```

## 回调函数的this

当回调函数是一个this对象的方法时，我们必须**改变执行回调函数**的方法来保证this对象的上下文。否则如果回调函数被传递给一个全局函数，this对象要么指向全局window对象，要么指向包含方法的对象。

举个栗子

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

实际上，getUserInput是全局函数，在 clientData.setUserName 执行时，this对象指向windows对象，所以在进一步的执行下，this一直是window。

但是，请注意！不要被结果误导！

这两种情况并不一样！

![1563784572212](C:\Users\Chitt\AppData\Roaming\Typora\typora-user-images\1563784572212.png)

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

