## 数组API

写这个总结是因为做算法题的时候，数据基本是用到最多的数据结构了，不管是栈还是队列其实都用数组实现的。今天做算法题脑子不清醒，写数组操作把map写成了forEach，导致结果怎么调试都不对。debug了半天才发现，嗷，误用了API。

不熟悉API是做算法题的大忌，所以趁此机会好好整理一下，让脑子更加清醒一点



将数组API大致分为3类：

- 直接修改原数组
- 原数组不变，返回一个新的数组
- 数组遍历方法



### 直接修改原数组的

- **pop();**

删除数组中最后一个元素，减少数组length值，并且移除的这个元素。

- **push();**

添加一个或多个元素到数组末尾，逐个加入，并且返回数组新长度。

- **shift();**

删除数组的第一个元素，并返回删除的这个元素；如果数组为空，返回undefined。

- **unshift();**

在数组开始处插入一些元素，并返回数组新长度。

- **splice()**

从数组中添加/删除一些元素，然后返回被删除的元素

删除：删除的第一项位置 要删除的项数 

```js
splice（0,2）//删除前两项
```

插入：起始位置 0 要插入的项 

```js
splice(2,0,4,6)//从位置2插入4,6
```

替换 : 起始位置 要删除的项数 要插入的东西  

```js
splice(2,1,4,5)//删除位置2的一项插入4,6
```

splice方法始终返回一个数组，数组包含原始数组中删除的项，没有就返回一个空数组。

- **reverse()**

颠倒数组中元素的顺序

- **sort()**

数组排序 默认按升序排列（最小在前，最大在后）

在排序时，sort()会调用每个数组项的toString(),然后比较得到的字符串，即使每一项都是数值，sort()比较的也是字符串。

所以:

```js
[11,24,41,3].sort();//[11,24,3,41]
```

sort()可以接受一个比较函数作为参数，比较函数接受两个参数，如果第一个参数应该位于第二个之前则返回一个负数；如果第一个参数位于第二个之后应该返回一个正数。

升序：

```js
arr.sort((a,b)=>a-b)
```

降序：

```js
arr.sort((a,b)=>b-a)
```

- **fill() --ES6新增**

将数组制定区间内的元素替换为某个值:

```js
var arr=[1,2,3,4]
```

功能1：字面意思填满 

```js
arr.fill(5) //[5,5,5,5]
```

功能2：指定范围替换 第一个参数替换值，第二个起始位置，第三个结束位置（不包含）

```js 
arr.fill(6,1,3)//[1,6,6,4]
```

功能3：扩展对象

```js
[].fill.call({length:3},4) //{0:4,1:4,2:4} 
```

- **copyWithin()--ES6新增**

数组内元素之间的替换,但替换的不变。

参数三个，被替换的其实位置， 选取替换值的起始位置，选取替换值的结束位置（不包含）

```javascript
var arr=[1,'c','d','a','b']//把ab放到0-1的位置

arr.copyWithin(0,3,5)//['a','b','d','a','b']
```



### 返回新数组的API

- **concat()**

将传入的数组或元素与原数组合并，组合成一个新数组返回。

这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本。

```js
var arr = [1,3,5,7];
var arrCopy = arr.concat(9,[11,13]);
console.log(arrCopy); //[1, 3, 5, 7, 9, 11, 13]
console.log(arr); // [1, 3, 5, 7](原数组未被修改)
```

所以，如果传入的不是数组，则直接把参数添加到数组后面，如果传入的是数组，则将数组中的各个项添加到数组中。但是如果传入的是一个二维数组呢？

```js
var arrCopy2 = arr.concat([9,[11,13]]);
console.log(arrCopy2); //[1, 3, 5, 7, 9, Array[2]]
console.log(arrCopy2[5]); //[11, 13]
```

上述代码中，arrCopy2数组的第五项是一个包含两项的数组，也就是说concat方法只能将传入数组中的每一项添加到数组中，如果传入数组中有些项是数组，那么也会把这一数组项当作一项添加到arrCopy2中。

- **slice()**

返回从原数组中指定开始下标到结束下标之间的项组成的新数组。

在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。

如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。

```js
var arr = [1,3,5,7,9,11];
var arrCopy = arr.slice(1);
var arrCopy2 = arr.slice(1,4);
var arrCopy3 = arr.slice(1,-2);
var arrCopy4 = arr.slice(-4,-1);
console.log(arr); //[1, 3, 5, 7, 9, 11](原数组不变)
console.log(arrCopy); //[3, 5, 7, 9, 11]
console.log(arrCopy2); //[3, 5, 7]
console.log(arrCopy3); //[3, 5, 7]
console.log(arrCopy4); //[5, 7, 9]
```

- **join()**

将数组中所有的元素连接成一个字符串。

默认逗号分隔，只接收一个参数：分隔符

- **indexOf()**

接收两个参数，要查找的项和查找起点索引

用于查找在数组中第一次出现时的索引，如果没有就返回-1

- **lastindexOf()**

接收两个参数，要查找的项和查找起点索引

用于从数组末尾查找第一次出现时的索引，如果没有就返回-1

- **includes()**--ES7新增

判断当前数组是否包含某个指定的值，如果有返回true,否则false

```js
[1, 2, 3, 4, 5].includes(4)    //true
[1, 2, 3, 4, NaN].includes(NaN)    //true
```

- **toSource()**

返回数组的源代码，目前只有火狐实现了.





### 数组遍历方法

- **forEach()**

每一项元素都执行一次传入的函数，**返回值undefined**。

参数都是function类型，默认有传参，参数分别为：遍历的数组内容；对应的数组索引，数组本身。

- **map()**

遍历数组，使用传入函数处理每个元素，并**返回函数的返回值组成的新数组**

- **filter()**

使用传入的函数测试所有元素，并**返回所有通过测试的元素**组成的新数组。

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arr2 = arr.filter((item, index) => {
　　return index % 3 === 0 || item >= 8;
}); 
console.log(arr2); //[1, 4, 7, 8, 9, 10]
```

- **every()**

使用传入的函数测试所有元素，只有所有项都满足条件，才会返回true。**验证是否每一个元素都满足的测试函数**！

- **some()**

使用传入的函数测试所有元素，只要有一个元素满足条件就返回true。**验证是否有元素都满足测试函数**

- **reduce()**

接收一个方法，作为累加器，从数组的第一项开始，逐个遍历到最后，最终返回一个值。

接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。 

调用的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。

- **reduceRight()**

接收一个方法，作为累加器，从数组的最后一项开始，向前遍历到第一项，最终返回一个值。

参数和调用函数参数同reduce。

```javascript
var values = [1,2,3,4,5];
var sum = values.reduceRight((prev, cur, index, array) => {
    return prev + cur;
},10);
console.log(sum); //25
//初始值是10，然后累加，得到25
```

- **find()**--ES6新增

返回数组中第一个满足条件的元素，没有返回-1。

```js
[1, 2, 3, 4, 5].find((item) => {return item > 3}) //4
```

- **findIndex()**--ES6新增

返回数组中的满足条件元素的索引，没有就返回-1。

- **keys()**--ES6新增
- **values**--ES6新增
- **entries**--ES6新增

keys()返回一个数组索引的迭代器；values返回一个数组迭代器对象，包含数组中每个索引的值。entries()返回一个数组迭代器对象，该对象包含数组中每个索引的键值对。

```js
var arr=['a', 'b', 'c']
for(let key of arr.keys()){
    console.log(key)//0,1,2     
}               
for(let value of arr.values()){
    console.log(value)//a,b,c 
}               
for(let [key, value] of arr.entries()){
    console.log([key,value])//[0,'a'],[1,'b'],[2,'c']
} 
```



### 其他

- Array.form()

把一些集合或者长得像数组的伪数组转化为真的数组，比如arguments，ES6的Set，js选择器找到的dom集合，以及一些对象模拟的数组。

```js
Array.from(obj / arguments / 伪数组) //返回的是一个数组
[].slice.call(arguments, 0) //这种方式根from方法是一样的效果

//Array.from还有第二个参数，是一个回掉函数，功能类似map
Array.from( [1, 2, 3], item => item * 2 )//[2,4,6]
```

- Array.of()

把参数合并成一个数组返回，如果参数为空，则返回一个空数组

```js
Array.of(1,2,3,4,5);//[1,2,3,4,5]
```

