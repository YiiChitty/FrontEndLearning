## DOM与事件

### DOM如何创建元素

- 创建

  createHTML('div');

- 添加

  appendChild(element)

  insertBefore(insertdom.chosendom)

### DOM获取元素的方式

#### 通过元素类型获取

1. document.getElementById();//id名，在实际开发中较少使用，选择器中多用class  id一般只用在顶级层存在 不能太过依赖id
2. document.getElementsByTagName();//标签名
3. document.getElementsByClassName();//类名
4. document.getElementsByName();//name属性值，一般不用
5. document.querySelector();//css选择符模式，返回与该模式匹配的第一个元素，结果为一个元素；如果没找到匹配的元素，则返回null
6. document.querySelectorAll()//css选择符模式，返回与该模式匹配的所有元素，结果为一个类数组

#### 根据关系树来选择

1. parentNode//获取所选节点的父节点，最顶层的节点为#document
2. childNodes //获取所选节点的子节点们 
3. firstChild //获取所选节点的第一个子节点
4. lastChild //获取所选节点的最后一个子节点
5. nextSibling //获取所选节点的后一个兄弟节点  列表中最后一个节点的nextSibling属性值为null
6. previousSibling //获取所选节点的前一兄弟节点   列表中第一个节点的previousSibling属性值为null

#### 根据元素节点树来选择

1. parentElement　//返回当前元素的父元素节点（IE9以下不兼容）
2. children  // 返回当前元素的元素子节点
3. firstElementChild //返回的是第一个元素子节点（IE9以下不兼容）
4. lastElementChild  //返回的是最后一个元素子节点（IE9以下不兼容）
5. nextElementSibling  //返回的是后一个兄弟元素节点（IE9以下不兼容）
6. previousElementSibling  //返回的是前一个兄弟元素节点（IE9以下不兼容）

### 如何给元素添加事件

- 在HTML元素中绑定事件 onclick=show()
- 获取dom，dom.onclick
- addEventListener(click,show,1/0)

### addEventListener三个参数，取值意思

第一个参数是事件类型，第二个是事件发生的回调函数，第三个是个布尔值，默认是false，false是冒泡阶段执行，true是捕获阶段。

### 节点属性中children和childNodes有什么区别？

- childNodes返回的是节点的子节点集合（NodeLists),包括元素节点、文本节点还有属性节点。
- children返回的只是节点的元素节点集合（HTMLCollection)

### HTMLCollection和NodeList的比较

- 共同点

  - 都是类数组对象，都有length属性

  - 都有共同的方法：item,可以通过item(index)获取返回结果的元素

  - 都是实时变动的，document上面的更改会反映到相关的对象上

    注：querySeletorAll返回的NodeList是个浅拷贝的类数组对象，在节点数目上是非实时的，不过对节点属性进行修改，还是实时反映的。

- 区别

  - NodeList可以包含任何节点类型，HTMLCollection只包含元素节点。elementNode就是HTML中的标签。
  - HTMLCollection比NodeList多一个方法：nameitem(),除了可以用id，还可以用name来获取节点信息。

### 事件冒泡与事件捕获

事件是先捕获，后冒泡

捕获阶段是外部元素先触发然后触发内部元素

冒泡阶段是内部元素先触发然后触发外部元素

### 如何阻止事件冒泡？如何取消默认事件？如何阻止事件的默认行为？

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

### 获取DOM节点get系列和query系列哪种性能好？

1.从性能上说get系列的性能都比query系列好，get系列里面各有差异，这些差异可以结合算法如何遍历搜索去理解，都解释得通。

2.`getElementsByTagName`比`querySelectorAll`快的原因在于：`getElementsByTagName`创建的过程不需要做任何操作，只需要返回一个指针即可。而`querySelectorAll`会循环遍历所有的的结果，然后创建一个新的NodeList。

3.实际在用的过程中**取决于要获取的是什么**，再进行选择。  

具体的可以参考看看探索篇-[对获取DOM的N种方法性能的思考](https://github.com/YiiChitty/FrontEndLearning/blob/master/一些思考/关于获取DOM节点的思考.md)

