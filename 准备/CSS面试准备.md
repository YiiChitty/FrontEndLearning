# CSS面经问题

## 1.水平居中

- 利用块级元素撑满父元素的特点，如果宽度已定，左右margin auto就可以平分剩余空间
- 利用行内块居中： 把父级元素设置为text-align=center，之后子元素的display设置为inline-block
- 绝对定位：postion ：absolute，之后left 50%
- flex: 父元素**display:flex justify-content：center**



## 2.垂直居中

- 先绝对定位postion:absolute，移出文件流，之后设置它的top,bottom,right,left=0，然后margin auto平分剩余的空间
- 使用内边距，让块级文字包裹在padding中，实现垂直居中。
- 对内联元素，使用行高的特性，行距上下一样， line-height 随便设
- 利用vertical-align：center，只能作用于内联元素上。如果是div的话可以设置display：table和table-cell
- 利用绝对定位 父元素relative 子元素absolute top 50%
-  flex: display：flex， align-item:center 



## 3.伪类和伪元素？

伪类存在的意义是为了通过选择器，格式化dom树以外的信息（:visited,:link），以及不能被常规CSS选择器获取到的信息（比如说获取第一个子元素，常规css选择器不行,可以用：first-child）。

伪类常用的有first-child、last-child、nth-child、first-of-type父元素第一个特定的子元素、last-of-type、nth-of-type、lang、focus、lvha（a标签四个）

伪元素可以创建一些文档语言无法创建的虚拟元素，比如文档语言没有一种机制可以描述元素内容第一个字母或者第一行，但是伪元素可以::first-letter,::first-line。同时伪元素还可以创建文档中不存在的内容比如说::after,::before。

伪元素主要有::after,::before,::first-letter,::first-line,::selection   


## 4.伪元素 after before

在指定的元素前或后面插入元素，和手动的增加一个div区别不是很大，你可以对这个伪类设置样式达到绘图的效果，这比用寻常的块级元素方便的多，比如加上引用啊，或者前后各一条横线什么的。
当然它最常用的还是用它来清除浮动了。



## 5.CSS 中 inline 元素可以设置 padding 和 margin 吗？

width、height可以设置，但是没有用。

padding 左右是有用的，上下么有用。

margin 上下左右都有用。



## 6.两栏布局，左边固定，要求先加载内容区域，说出多种方法

- float。两个div。左边float:left，width:200 px，右边 margin-left=width。
- 绝对定位。两个div。左边absolute或者fixed 右边margin-left=width
- table布局。三个div，父元素display：table，子元素display table-cell width，右边自适应
- flex布局。三个div,父元素display flex; 子元素flex:1



## 7.说一下什么是BFC

BFC是块级格式化范围，决定了元素如何对其内容进行定位，以及和其他元素的关系和相互作用。可以理解为它就是个独立的容器，容器里面的布局与外面互不影响。

float的值不能为none，overflow的值不为visible，display不为table-cell table-caption,inline-block，postion不为relative和static。

规则：垂直方向一个一个放；距离有margin决定，同一个bfc里面相邻会重叠；不会和浮动重叠；计算高度时浮动子元素也计算；容器内与容器外互不影响。



## 8.如何清除浮动

首先浮动的问题是：在一个容器里，有两个浮动子元素。因为浮动定位是不属于正常页面流的，它是独立定位的，所以只含有浮动元素的父容器，在显示时不考虑子元素的位置，所以显示出来父容器像是个空的一样。

解决方案：

- 把父元素一起浮动，但是这样不好，会影响后面的元素定位
- 给父容器加上overflow:hidden，加上之后，形成BFC，需要计算超出的大小来隐藏，所以父容器会撑开放入子元素，同时计算浮动的子元素。但是一旦子元素大小超过父容器大小就会显示异常。
- 在浮动元素后面添加一个不浮动的空元素，父容器必须考虑浮动子元素的位置，子元素出现在浮动元素后面，所以显示出来就正常了，但是需要添加额外的html标签，这违背了语义网的原则
- 利用伪元素：after，它在父容器尾部自动创建一个子元素，这个原理和3一样，可以把它设置为height：0不显示，clear：both display:block，保证空白字符不浮动区块。
  (但是：after不支持IE6，只需要添加上zoom：1,这个是激活父元素的haslayout属性，让父元素拥有自己的布局



## 9.元素隐藏方法

- display：none元素不可见，不占据空间，资源会加载，DOM可以访问
- visibility:hidden元素不可见，不能点击，但占据空间，资源会加载，可以使用。
- opacity：0 元素不可见、可以点击，占据空间，可以使用。（不占据的话再加一个position absolute)(不能点击不占据空间 postion absolute+z-index:-1)(不能点击、占据空间 postion relative z-index:-1)



## 10. display：none和visibility:hidden的区别

- display：none元素不占据空间，visibility:hidden空间保留

- display：none会影响opacity过渡效果

- display会产生重绘回流，visibility:hidden只重绘

- display：none节点和子孙节点都不见，visibility:hidden的子孙节点可以设置visibility:visible显示。



## 11.层叠上下文

层叠上线文就是结界，其中的元素如果跟层叠上下文之外的元素发生层叠，就比较他们的层叠水平高低来显示。

创建的方法：postion为relative、absolute、fixed的元素设置z-index

顺序是：底层的border、background，负值z-index，块级盒子，浮动盒子，内联盒子，z-index：auto,正z-index



## 12.CSS box-sizing 的值有哪些？

有三种属性吧，一种是content-box，一种是border-box,还有一个是从父元素继承的inherit。

content-box一 宽高应用到内容框

border-box— 宽高包括了内边距和边框



## 13. 块级元素和行内元素

- 区别

  - 行内元素会在一行水平方向排列，块级元素独占一行
  - 块级元素可以包含行内元素和块级元素，行内只能包含文本和其他行内元素
  - 盒模型属性上，行内元素width height无效，pading上下无效

- 互换

  display：inline/block

- inline-block元素

  既可以设置高宽，又有inline元素不换行的特性。



## 14.三栏布局

- 浮动布局 float:left right，中间根据两边的width设置margin(要加两边的border)

- 绝对定位 父元素 relative，左右leftright各为0，absolute，中间元素设置margin

- BFC 左右float，中间overflow：hidden

- Flex 写法左中右，父元素display:flex，中间区域flex:1

- table布局，写法左中右，父元素display：table，三个元素table-cell

- 圣杯布局 写法中左右，中间width100%，左边margin-left -100%，右边margin-left= -width（-100px); 然后防遮住中间，左右相对定位relative。

- 双飞翼  中间再包裹一层，左，右。中间父元素 float left，width：100%。

  中间子元素 margin left right 左右的width。 左右float,左边margin-left -100%，右边margin-left -width









