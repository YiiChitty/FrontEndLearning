# 关于获取DOM节点的思考

今天早上看别人的面经，看到了一个非常有意思的问题：

> 问：`getElementById、getElementByName、getElementByTagname、querySelectorAll、querySelector`在性能上有什么差别？



感觉这个问题问的很有意思。

在jquery开发的时候，为了方便，感觉一般都是用`querySelector`+CSS选择器去做。但为了浏览器兼容性，大多数时候都是给一些不好直接getElementByxxx的设置一个ID。

好像**从来没有考虑过性能的问题**。

起初就是觉得querySelector比较慢因为要先找到选择器的东西，再去取，肯定时间慢，搜了一圈大多都是从实验得出来的结果，很少有人具体去描述原因到底是什么。



对此问题，我进行了一些探索。

下面是我的一些探索过程，对原因进行了一些尝试性地解释，**但请以辨证的眼光去阅读，因为我说的不一定对**……

<br/>

节约各位时间，先说结论吧：

1.从性能上说get系列的性能都比query系列好，get系列里面各有差异，这些差异可以结合算法如何遍历搜索去理解，都解释得通。

2.`getElementsByTagName`比`querySelectorAll`快的原因在于：`getElementsByTagName`创建的过程不需要做任何操作，只需要返回一个指针即可。而`querySelectorAll`会循环遍历所有的的结果，然后创建一个新的NodeList。

3.实际在用的过程中**取决于要获取的是什么**，再进行选择。  


<br/>


探索的过程很长，不过一圈下来，我对这部分内容已经有了一个非常清晰的认识了。如果你有兴趣，也可以继续读下去：

**1.从问题反思**

首先，为了探索这个问题，我在HTML里面写了三个并列的p标签

```html
<p name="p1" id="p1">duanluo1</p>
<p name="p2">duanluo2</p>
<p name="p3">duanluo3</p>
```

然后直接使用

```js
var a=document.getElementById('p1');
var b=document.getElementsByName('p1');
var c=document.getElementsByTagName('p');
var d=document.querySelectorAll('p');
var e=document.querySelector('#p1');

输出结果是：
a //<p name="p1" id="p1">duanluo1</p>
b //NodeList[p#p1] 0:p#p1
c //HTMLCollection(3)[p#p1,p,p,p1:p#p1,p2:p,p3:p]
d //NodeList(3)[p#p1,p,p]
e //<p name="p1" id="p1">duanluo1</p>
```

通过上面简单的检测发现，`getElementById`和`querySelector`返回的都是一个节点。`getElementsByName`返回的是一个长度为1的`NodeList`。`getElementsByTagName`返回的是所有p标签的`HTMLCollection`集合。`querySelectorAll`返回的是所有p标签的`NodeList`。

那么他们的性能到底哪个更好呢？

**2.从实践中摸索**

实践出真知。

我们写一个循环来测试一下。

```js
console.time('querySelector');
for (var i = 0; i < 10000000; i++) {
  document.querySelector("#p1");
}
console.timeEnd('querySelector');
//11.60205078125ms
```

```js
console.time('getElementById');
for (var i = 0; i < 10000000; i++) {
  document.getElementById("p1");
}
console.timeEnd('getElementById');
//6.268798828125ms
```

显然，`getElementById`在性能上确实要好很多。

接着，我又测试了一下`querySelectorAll`和`getElementsByClassName`。

```js
console.time('querySelectorAll');
for (var i = 0; i < 10000000; i++) {
  document.querySelectorAll(".p1");
}
console.timeEnd('querySelectorAll');
// 4.939697265625ms
```

```js
console.time('getElementsByClassName');
for (var i = 0; i < 10000000; i++) {
  document.getElementsByClassName("p1");
}
console.timeEnd('getElementsByClassName');
//1.815185546875ms
```

好像还是get系列的性能更好。

再试一下`querySelectorAll`和`getElementsByTagName`

```js
console.time('querySelectorAll');
for (var i = 0; i < 10000000; i++) {
  document.querySelectorAll("p");
}
console.timeEnd('querySelectorAll');
// 6.180908203125ms
```

```js
console.time('getElementsByTagName');
for (var i = 0; i < 10000000; i++) {
  document.getElementsByTagName("p");
}
console.timeEnd('getElementsByTagName');
//1.714111328125ms
```

**实验一圈下来的结果就是get系列比query系列在性能上确实好很多。**

但是**原因不清楚。**



**3.从结果中猜测**

本着不懂就问的探索精神，我观测到了两种不同的集合：`NodeList`和`HTMLCollection`。我开始猜想，会不会与这两种不同的集合有关。

于是，我搜到了他们的定义：`HTMLCollection`是元素集合，`NodeList`是节点集合。`NodeList`的元素是Node；`HTMLCollection`的元素是Element，**Element继承自Node，是Node的一种**，在HTML中，它一般是HTML元素（比如p，a之类的标签创建出来的对象）。而Node作为父类，除了Element还有一些其他子类，比如HTML元素内的文本对应的Text，文档对应的Document，注释对应的Comment。除此之外，他们还有差异是`NodeList`没有`nameItem`，但是`HTMLCollection`是有的。

子元素我看懂了，但**nameItem是个啥玩意？？？**

我试着打印出了上面的c变量（`getElementsByTagName`)

```
0: p#p1
1: p
2: p
length: 3
p1: p#p1.p1
p2: p
p3: p
__proto__: HTMLCollection
```

看完这个`HTMLCollection`的内部，其实也能明白，`HTMLCollection`给添加了name属性。所以就有了：

```js
c[0]===c.p1 //true
```

所以，就 `getElementById`和 `getElementsByName`而言，尽可以大胆猜测一下，平均查找的复杂度应该是`getElementById`更优。因为遍历是从上到下依次遍历的，id是唯一的，找到就返回，name可能有多个，不论如何都要从头到尾遍历一遍。

那么，`NodeList`又长啥样呢？（`querySelectorAll`）

```
NodeList(3) [p#p1, p, p]
0: p#p1
1: p
2: p
length: 3
__proto__: NodeList
```

好像除了少了点nameitem没什么不一样……



**真的如此吗？**

我试着在浏览器的页面上添加了一个p标签。

```html
<p name="p1" id="p1">duanluo1</p>
<p name="p2">duanluo2</p>
<p name="p3">duanluo3</p>
<p name="p4">duanluo4</p>
```

再次打印，发现出来了不一样的结果

```js
d //NodeList(3) [p#p1, p, p]
c //HTMLCollection(4) [p#p1, p, p, p, p1: p#p1, p2: p, p3: p, p4: p]
```

似乎……**`HTMLCollection`是动态的，NodeList是静态的**！



嗯？？？似乎之前`getElementsByName`返回的也是一个NodeList吧？

那么不如，再动态改一下。

我在id为p1的p标签上又添加了一个class属性。

```html
<p name="p1" id="p1"class='p1'>duanluo1</p>
<p name="p2">duanluo2</p>
<p name="p3">duanluo3</p>
<p name="p4">duanluo4</p>
```

随后输出：

```js
b //NodeList [p#p1.p1]
```

？？？**这不是动态的吗？**

为啥`QuerySeletorAll`出来的`NodeList`是静态的？？？

再次输出一下`QuerySeletorAll`

```js
d //NodeList(3)[p#p1.p1,p,p]
```

所以，`NodeList`是静态的这个论断似乎不太准确。**它的属性变化也还是动态的，只不过节点数目是静态的。**



探索了这么多，先做个总结：

如果获取元素返回的列表里只有Element，那这两种类没多大区别，但事实上很多时候浏览器会将解析HTML文本时得到的Text和Comment一并放进列表里放回。所以` node.childNodes `返回`NodeList`，而 `node.children `和`node.getElementsByXXX` 返回 `HTMLCollection` 。

get系列中**只有`document.getElementsByName`返回的还是`NodeList`对象**。

`querySelectorAll `返回的虽然是 `NodeList` ，但是实际上是**元素集合**（不包含空格text节点，不包含注释节点），并且**元素的数量是静态的，但元素的属性是动态的**。



我个人觉得querySelectorAll可以理解为浅拷贝了一个元素集合，虽然集合里元素的数目不会被改变，但集合里面元素都是对象，属性的变化它也会随之变化。



**4.从理论中找答案**

可我说了不算数啊，那么来看看大佬怎么说吧：[地址](https://humanwhocodes.com/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall/)

翻译一下就是：

`NodeList`和`HTMLCollection`是两个特别的对象类型，3级DOM中是这样定义的：

　　`NodeList`和`NamedNodeMap`在DOM中都是动态的，**改变Dom结构都会影响到`NodeList`和`NamedNodeMap`**。

例如：如果获取一个有子节点的NodeList，然后增加或者删除子节点，这个NodeList也会动态的改变。同样的，在一个tree结构中改变一个node会影响到所有引用这个node的NodeList和NamedNodeMap对象。

那么`querySelectorAll`又是咋回事呢？我们需要看一下它的API：[地址](https://www.w3.org/TR/selectors-api/#queryselectorall)

API这里的说明已经非常明确了，不用再考虑了

> The [`NodeList`](https://www.w3.org/TR/selectors-api/#nodelist) object returned by the `querySelectorAll()` method *must* be static, not [live](http://www.w3.org/TR/DOM-Level-3-Core/core.html#td-live) ([[DOM-LEVEL-3-CORE\]](https://www.w3.org/TR/selectors-api/#DOM-LEVEL-3-CORE), section 1.1.1). Subsequent changes to the structure of the underlying document *must not* be reflected in the [`NodeList`](https://www.w3.org/TR/selectors-api/#nodelist) object. 

好了，这两个东西搞清楚了，是时候来剖析性能了。

大佬的话翻译成中文是这样的：

动态的NodeList返回的更快是因为不需要获取这个节点的所有信息，而静态的需要。`getElementsByTagName`创建的过程不需要做任何操作，只需要返回一个指针即可。而`querySelectorAll`会循环遍历所有的的结果，然后创建一个新的NodeList。

所以这才是`getElementsByTagName`比`querySelectorAll`快的真正原因！  

<br/>

好了，通过一圈的探索下来，我算是搞明白了，不知道读到这篇文章的你有没有看明白呢？

<br/>

最后，提供一些相关的资料供你参考：

[知乎问题：querySelectorAll 方法相比 getElementsBy 系列方法有什么区别](https://www.zhihu.com/question/24702250)  

[querySelector和getElementById性能分析与使用选择](https://blog.csdn.net/hualimeme/article/details/44410895)

还有文内提到的英文博客：

[Why is getElementsByTagName() faster than querySelectorAll()?](https://humanwhocodes.com/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall/)

以及API说明

[链接](https://www.w3.org/TR/selectors-api/#queryselectorall)
