# Class中箭头函数和普通函数是咋回事？

今天看到了一个有趣的面经：

> 假如一个Class里面有箭头函数和function, 那么他们在被调用的时候this有什么区别？

调用……无非就是new一下，生成一个实例嘛。

箭头函数的this指向定义时所在的对象，那么也就是说，如果Class A下有一个箭头函数x，这个函数x内的this会指向A。new的时候，this指向这个对象，也就是A。

乍一看好像啥区别啊……

怀着探索的精神我在控制台敲了如下几行代码：

```js
class A{
	x=()=>{
		console.log(this,x);
	}
	y(){
		console.log(this,y);
	}
}
//生成一个实例
let a=new A();
```

然后执行a的两个方法

```js
a.x(); //输出 A{x:f} "x"
a.y();//输出 A{x:f} "y"
```



似乎没什么区别……

点开a这个实例对象，好像有点奇怪？

```
A {x: ƒ}
	x: ()=>{ console.log(this,'x'); }
	__proto__:
		constructor: class A
		y: ƒ y()
		__proto__: Object
```

似乎箭头函数x是建在实例上的，而普通函数则在A.prototype。



所以他们其实相当于：

```js
function A(){
	this.x=function(){
    	console.log(this,'x');
	}
}
A.prototype.y=function(){
    console.log(this,'y')
}
```



其实，这也很好理解。因为x的this一直被绑定在A上，其实就相当于说是this.x。类似构造函数内的一个值。



有点意思，那这样看的话，在继承上也是有区别的。

先试试普通的：

```js
class A{
    print(){
        console.log('a1');
    }
}

class B extends A{
    print(){
        super.print();
        console.log('b')
    }
}

const b=new B();
b.print();
```

正如 我们所料的那样，输出了a1 和 b。

接下来试试箭头函数：

```js
class A{
	print=()=>{
        console.log('a2');
    }
}

class B extends A{
    print(){
        super.print();
        console.log('b')
    }
}

const b=new B();
b.print();
```

输出的结果为a2，没有输出输出b。



**Why？？？**

先从现象看，看看b这个实例是什么东西好了：

```js
> b
B {print: ƒ}
	print: ()=>{ console.log('a2'); }
	__proto__: A
		constructor: class B
		print: ƒ print()
		__proto__: Object
```

可以看到print(a2)被建在了实例上。

当我们调用b.print的时候，在实例上就找到了print方法，这就不必再向上查找了。

问题来了，那我们在B里面写的print去哪了呢？

按照最开始的探索，多半是在原型上

```js
> B.prototype
	A {constructor: ƒ, print: ƒ}
		constructor: class B
		print: ƒ print()
	__proto__: Object
```

是的，没错 =。=

```js
> B.prototype.print
ƒ print(){
        super.print();
        console.log('b')
    }
```



现象看完了，现在该去找原因了。

常规写法中，类的非静态属性都定义在原型对象上。箭头函数定义的方法this指向的是当前创建类的实例对象。所以其实A的内部应该是这样的

```js
function A(){
    this.print=function(){
        console.log('a2');
    }
}
```

B继承A，不仅会继承A原型上的属性和方法，还会继承实例上的属性和方法，所以B中应该等价于：

```js
function B(){
    this.print=function(){console.log('a2');}
}
B._proto_=A;
B.prototype._proto_===A.prototype;

B.prototype.print()=function{
    //...
}   
```

所以，当b.print的时候只会输出a2，不会输出b。因为在实例上已经找到了，即使在原型上定了同一个属性，这个属性也不会被访问到，这就叫做“Property shadowing”。



##  总结

在class里用普通函数和箭头函数，虽说this的输出都是这个class，但是要明白，箭头函数是在实例对象上，而普通函数是在原型对象上的。