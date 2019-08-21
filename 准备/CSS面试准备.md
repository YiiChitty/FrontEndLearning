# CSS问题

## 盒子模型，CSS3的 box-sizing 的值有哪些？

盒子模型是指用来装页面上元素的矩形区域，CSS的盒子模型包括IE盒子模型和标准W3C的模型。区别在于width，IE盒子中width表示Content+padding+border。

box-sizing有三种属性吧，一种是content-box，一种是border-box,还有一个是从父元素继承的inherit。现在好像还有一个padding-box。

content-box一 宽高应用到内容框

border-box— 宽高包括了内边距和边框

padding-box—高宽包括了内边距



## link标签和@import url()标签的区别

@import是CSS提供的语法规则，只有导入样式表的作用；link属于html标签，不仅可以加载css还可以定义RSS rel连接属性等。

link会在页面加载的同时被加载；@import引用的CSS会等到页面加载结束后加载

link是html标签，没有兼容性问题；@import需要IE5+

link方式样式**权重高**于@import



## 块级元素和行内元素

- 区别

  - 行内元素会在一行水平方向排列，块级元素独占一行，自动填满父级元素
  - 块级元素可以包含行内元素和块级元素，行内只能包含文本和其他行内元素
  - 盒模型属性上，行内元素width height无效，pading和margin垂直方向上无效

- 互换

  display：inline/block

- inline-block元素

  既可以设置高宽，又有inline元素不换行的特性。



## inline-block、inline和block的区别？

block是块级元素，前后都有换行符，能设置宽高，margin/padding都有效

inline设置宽高无效，margin在竖直方向无效，padding有效，前后无换行符

inline-block可以设置宽高，margin/padding有效，前后无换行符



## 为什么img是inline还可以设置宽高？

img是**可替换元素**，这类元素的展现效果不是由CSS来控制的。他们是一种外部对象，外观的渲染独立于CSS。内容不受当前文档的样式影响，CSS可以影响可替换元素的位置，但是不会影响到可替换元素自身的内容。（比如iframe，可能有自己的样式表，不会继承父文档的样式）
可替换元素有内置宽高，性质同设置了inline-block一样。



## 伪类和伪元素？

**伪类可以理解为是一种状态，而伪元素则代表一些实实在在存在的元素，但是它们都是抽象刻画的，游离于标准文档之外。**

伪类存在的意义是为了通过选择器，格式化dom树以外的信息（:visited,:link），以及**不能被常规CSS选择器获取到的信息**（比如说获取第一个子元素，常规css选择器不行,可以用：first-child）。

伪类常用的有first-child、last-child、nth-child、first-of-type父元素第一个特定的子元素、last-of-type、nth-of-type、lang、focus、lvha（a标签四个）

伪元素可以**创建一些文档语言无法创建的虚拟元素**，比如文档语言没有一种机制可以描述元素内容第一个字母或者第一行，但是伪元素可以::first-letter,::first-line。同时伪元素还可以创建文档中不存在的内容比如说::after,::before。

伪元素主要有::after,::before,::first-letter,::first-line,::selection   



## CSS选择器的权重

- ！important 权重无限大
- 内联样式 写在html标签里的
- 类 伪类 和属性选择器
- 标签选择器和伪元素选择器 div p:after
- 通配符、子选择器、相邻选择器
- 继承的样式没有权值



## 外边距重叠

多个相邻(兄弟或父子) 普通流的块级元素在垂直方向的margin会重叠

- 两个相邻的外边距都为正数，折叠结果是较大的值
- 两个相邻的外边距为负数，折叠结果是绝对值较大的值
- 两个相邻外边距为一正一负，折叠结果是他们的和



## 说一下什么是BFC

BFC是块级格式化范围，决定了元素如何对其内容进行定位，以及和其他元素的关系和相互作用。可以理解为它就是个**独立的容器，容器里面的布局与外面互不影响**。

触发规则：

- 根元素
- 浮动元素

- postion：absolute 或 fixed
- display：inline-block，table-cell，table-caption，flex，inline-flex
- overflow：不为visible

规则：垂直方向一个一个放；距离由margin决定，同一个bfc里面相邻会重叠；不会和浮动元素重叠；计算高度时浮动子元素也计算；容器内与容器外互不影响。

主要用途：清除浮动 防止margin重叠




## 伪元素 after before

在指定的元素前或后面插入元素，和手动的增加一个div区别不是很大，你可以对这个伪类设置样式达到绘图的效果，这比用寻常的块级元素方便的多，比如加上引用啊，或者前后各一条横线什么的。
当然它最常用的还是用它来清除浮动了。



## CSS 中 inline 元素可以设置 padding 和 margin 吗？

width、height可以设置，但是没有用。

padding 左右是有用的，上下么有用。

margin 上下左右都有用。





## 如何清除浮动

当元素设置float浮动后，该元素会脱离文档并向左向右浮动，直到碰到父元素或者另一个浮动元素，浮动元素会造成父元素高度塌陷，所以设置完浮动之后需要进行清除浮动

解决方案：

- BFC

  给父容器加上overflow:hidden，加上之后，形成BFC，需要计算超出的大小来隐藏，所以父容器会撑开放入子元素，同时计算浮动的子元素。

  缺点：但是一旦子元素大小超过父容器大小就会显示异常。

- 使用带有clear属性的空元素

  在浮动元素后面添加一个不浮动的空元素，父容器必须考虑浮动子元素的位置，子元素出现在浮动元素后面，所以显示出来就正常了。

  同时要给空元素加上:```style="clear:both"```

  缺点：需要添加额外的html标签，这违背了语义网的原则

- 使用伪元素::after

  它父容器尾部自动创建一个子元素，原理和空元素一样，可以把它设置为height：0不显示，clear：both display:block，保证空白字符不浮动区块。
  (但是：after不支持IE6，只需要添加上zoom：1,这个是激活父元素的haslayout属性，让父元素拥有自己的布局）

  ```css
  .clearifx::after{
      content:'';
      height:0;
      clear:both;
      display:block;
  }
  .clear{
      zoom:1;
  }
  ```

  

## 元素隐藏方法

- display：none元素不可见，不占据空间，资源会加载，DOM可以访问
- visibility:hidden元素不可见，不能点击，但占据空间，资源会加载，可以使用。
- opacity：0 元素不可见、可以点击，占据空间，可以使用。（不占据的话再加一个position absolute)(不能点击不占据空间 postion absolute+z-index:-1)(不能点击、占据空间 postion relative z-index:-1)



## display：none和visibility:hidden的区别

- display：none元素不占据空间，visibility:hidden空间保留

- display：none会影响opacity过渡效果

- display会产生重绘回流，visibility:hidden只重绘

- display：none节点和子孙节点都不见，visibility:hidden的子孙节点可以设置visibility:visible显示。

- visibility:hidden不会影响计数器计数（ol标签）

  

## img和background-image的区别

- 解析机制：img属于html标签，background-img属于css。img先解析
- SEO：img标签有一个alt 属性可以指定图像的替代文本，有利于SEO，并且在图片加载失败时有利于阅读
- 语义化角度：img语义更加明确



## rgba()和opacity的区别

- opacity作用于元素及元素中所有的内容（包括文字、图片） 有继承性
- rgba()只用于元素的颜色及背景色
- 当opacity属性的值应用于某个元素上时，把这个元素和它内容当作一个整体来看待，即使这个值没有被子元素继承。因此一个元素和它包含的元素都会有与元素背景相同的透明度，哪怕父子元素由不同的opacity的值。



## outline和border的区别

- outline轮廓是绘制于元素周围的一条线，位于边框边缘的外围，可以起到突出元素的作用
- outline的效果将随元素的focus而自动出现，相应的由blur自动消失，这些都是浏览器的默认行为，不需要js配合css来控制
- outline不占据空间，不会像border那样影响元素的尺寸或者位置。





## 层叠上下文

层叠上线文就是结界，其中的元素如果跟层叠上下文之外的元素发生层叠，就比较他们的层叠水平高低来显示。

创建的方法：postion为relative、absolute、fixed的元素设置z-index

顺序是：底层的border、background，负值z-index，块级盒子，浮动盒子，内联盒子，z-index：auto,正z-index



## 水平居中

- 利用块级元素撑满父元素的特点，如果宽度已定，左右margin auto就可以平分剩余空间
- 利用行内块居中： 把父级元素设置为text-align=center，之后子元素的display设置为inline-block
- 绝对定位：postion ：absolute，之后left 50%
- flex: 父元素**display:flex justify-content：center**



## 垂直居中

- 元素无高度

  利用内边距，让块级文字包裹在padding中，实现垂直居中。

- 父元素高度确定的单行文本：

  使用行高的特性：height=line-height即可。

- 父元素高度确定的多行文本：

  利用vertical-align（只能内联元素）如果是div，可以设置为table和table-cell。

  ```css
  display：table-cell;
  vertical-align:center;
  ```

- 父元素高度未知：

  绝对定位，设置top 50%

  ```css
  parent{
      position:relative;
  }
  child{
      position:absolute;
      top:50%;
      transform:translateY(-50%);
  }
  ```

  如果子元素有高度

  ```css
  child{
      position:absolute;
      top:50%;
      height=Hpx;
      margin-top:(H/2)px;
  }
  ```

- 父元素高度已知

  ```css
  parent{
      height:Hpx;
  }
  child{
      position:relative;
      top:50%;
      transform:translateY(-50%);
  }
  ```

- flex方法

  ```css
  disply:flex;
  align-items:center;
  ```



## 水平垂直居中

- 居中元素的宽高已知

  - 利用绝对定位和margin

  ```css
  parent{
      position:relative;
  }
  child{
      position:absolute;
      top:50%;
      left:50%;
      margin-top:(-H/2)px;
      margin-left:(-W/2)px;
  }
  ```

  - absolute+margin:auto

  ```css
  child{
      width:50px;
      height:50px;
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      margin:auto;
  }
  ```

  - 用calu计算

  ```css
  child{
      position:absolute;
      top:calc(50%-50px);
      left:calc(50%-50px);
  }
  ```

- 垂直居中的元素宽高未知

  - transform的translate方法

  ```css
  child{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
  }
  ```

  - flex布局

  ```css
  child{
      display:flex;
      align-items:center;
      justify-content:center;
  }
  ```

  

## 两栏布局，左边固定，要求先加载内容区域，说出多种方法

- float。两个div。左边float:left，width:200 px，右边 margin-left=width。
- 绝对定位。两个div。左边absolute或者fixed 右边margin-left=width
- table布局。三个div，父元素display：table，子元素display table-cell width，右边自适应
- flex布局。三个div,父元素display flex; 子元素flex:1



## 三栏布局

- 浮动布局 float:left right，中间根据两边的width设置margin(要加两边的border)

- 绝对定位 父元素 relative，左右leftright各为0，absolute，中间元素设置margin

- BFC 左右float，中间overflow：hidden

- Flex 写法左中右，父元素display:flex，中间区域flex:1

- table布局，写法左中右，父元素display：table，三个元素table-cell

- 圣杯布局 写法中左右，中间width100%，左边margin-left -100%，右边margin-left= -width（-100px); 然后防遮住中间，左右相对定位relative。

- 双飞翼  中间再包裹一层，左，右。中间父元素 float left，width：100%。

  中间子元素 margin left right 左右的width。 左右float,左边margin-left -100%，右边margin-left -width



## Flex布局

Flex是弹性布局，用来为盒装模型提供最大的灵活性。布局的传统解决方案基于盒装模型，依赖display、position和float属性。**任何一个容器都可以指定为 Flex 布局**。

注意：**设置为 Flex 布局后，子元素的 float 、clear 和 vertical-align 属性将失效。**

属性分为容器属性和元素属性：
- 容器属性包括
  - flex-direaction:决定主轴方向
  ```css
  .box{
      flex-direaction:row|row-reverse|column|column-reverse;
  }
  ```
  - flex-wrap:决定了如何换行
  ```css
  .box{
      flex-wrap:nowrap|wrap|wrap-reverse;
      /*不换行|换行第一行在上|换行第一行在下*/
  }
  ```
  - flex-flow:前面两个的简写
  ```css
  .box{
        flex-flow:<flex-direction>||<flex-wrap>;
    }
  ```
  - justify-content：水平轴对齐方式
  ```css
  .box{
        justify-content:flex-start|flex-end|center|space-between|space-around;    
    }
  ```
  - align-items: 垂直轴对齐方式
  ```css
  .box{
      align-items:flex-start|flex-end|center|space-between|space-around;
  }
  ```
- 元素属性align-content
  - order 定义项目的排序顺序，越小越靠前
  - flex-grow 放大比列，默认是0，即使存在空间也不会放大，1是说等分剩余空间
  - flex-shrink 缩小比例，当空间不够的情况下，会等比缩小为0不缩小，为1等比缩小
  - flex-basis 定义分配多余空间时，项目占据的控件
  - flex 上面三个属性的缩写，默认是0 1 auto。后两个属性可选。
  - align-self 允许单个与其他不一样的对齐方式，可以覆盖align-items属性，默认是auto表示继承。



## CSS动画如何实现

创建动画序列，需要animation属性或其子属性，属性允许配置动画时间、时长和动画细节。

动画的实际表现由@keyframes 规则实现

transtion也可以实现动画，但强调过渡，是元素的一个或多个属性变化时产生的过渡效果，同一个元素通过两个不同的途径获取样式，而第二个途径当某种改变发生时（如：hover)才能获取样式，这样就会产生过渡动画。



## transition、animation的区别

animation和transition大部分属性相同，都是随时间改变元素的属性值，区别是transition需要触发一个事件才能改变属性；animation不需要触发任何事件随时间改变属性。transition为2帧，从from……to ，animation可以一帧一帧的。





