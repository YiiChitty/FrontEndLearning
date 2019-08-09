# HTML+CSS面经问题整理

##  1.html中的meta标签是用来做什么的？
提供给机器解读的一些元数据。页面搜索引擎优化，定义页面实用语言等等。
属性有两个

1）**http-equiv+content**

参数有charset(编码格式)、expires(过期时间)、refresh(特定时间内自动刷新跳转)、pragma(禁止浏览器从本地计算机缓存中访问页面内容no-cache)、widows-target(设定页面在窗口中以独立页面展示，防止被当成frame页调用)、set-cookie(自定义cooke)、content-Type(字符集)

2）**name+content**

参数有keywords(关键字)、description(主要内容)、robots(none不被检索)、author、generator(使用的制作软件)、copyright、viewport(缩放比例)



## 2.水平居中

- 利用块级元素撑满父元素的特点，如果宽度已定，左右margin auto就可以平分剩余空间
- 利用行内块居中： 把父级元素设置为text-align=center，之后子元素的display设置为inline-block
- 绝对定位：postion ：absolute，之后left 50%
- flex: 父元素**display:flex justify-content：center**



## 3.垂直居中

- 先绝对定位postion:absolute，移出文件流，之后设置它的top,bottom,right,left=0，然后margin auto平分剩余的空间
- 使用内边距，让块级文字包裹在padding中，实现垂直居中。
- 对内联元素，使用行高的特性，行距上下一样， line-height 随便设
- 利用vertical-align：center，只能作用于内联元素上。如果是div的话可以设置display：table和table-cell
- 利用绝对定位 父元素relative 子元素absolute top 50%
-  flex: display：flex， align-item:center 



## 4.伪类和伪元素？

伪类存在的意义是为了通过选择器，格式化dom树以外的信息（:visited,:link），以及不能被常规CSS选择器获取到的信息（比如说获取第一个子元素，常规css选择器不行,可以用：first-child）。

伪类常用的有first-child、last-child、nth-child、first-of-type父元素第一个特定的子元素、last-of-type、nth-of-type、lang、focus、lvha（a标签四个）

伪元素可以创建一些文档语言无法创建的虚拟元素，比如文档语言没有一种机制可以描述元素内容第一个字母或者第一行，但是伪元素可以::first-letter,::first-line。同时伪元素还可以创建文档中不存在的内容比如说::after,::before。

伪元素主要有::after,::before,::first-letter,::first-line,::selection

## 5.伪元素 after before

在指定的元素前或后面插入元素，和手动的增加一个div区别不是很大，你可以对这个伪类设置样式达到绘图的效果，这比用寻常的块级元素方便的多，比如加上引用啊，或者前后各一条横线什么的。
当然它最常用的还是用它来清除浮动了。



## 6.CSS 中 inline 元素可以设置 padding 和 margin 吗？

width、height可以设置，但是没有用。

padding 左右是有用的，上下么有用。

margin 上下左右都有用。



## 7.两栏布局，左边固定，要求先加载内容区域，说出多种方法

- float。两个div。左边float:left，width:200 px，右边 margin-left=width。
- 绝对定位。两个div。左边absolute或者fixed 右边margin-left=width
- table布局。三个div，父元素display：table，子元素display table-cell width，右边自适应
- flex布局。三个div,父元素display flex; 子元素flex:1



## 8.说一下什么是BFC

BFC是块级格式化范围，决定了元素如何对其内容进行定位，以及和其他元素的关系和相互作用。可以理解为它就是个独立的容器，容器里面的布局与外面互不影响。

float的值不能为none，overflow的值不为visible，display不为table-cell table-caption,inline-block，postion不为relative和static。

规则：垂直方向一个一个放；距离有margin决定，同一个bfc里面相邻会重叠；不会和浮动重叠；计算高度时浮动子元素也计算；容器内与容器外互不影响。



## 9.如何清除浮动

首先浮动的问题是：在一个容器里，有两个浮动子元素。因为浮动定位是不属于正常页面流的，它是独立定位的，所以只含有浮动元素的父容器，在显示时不考虑子元素的位置，所以显示出来父容器像是个空的一样。

解决方案：

- 把父元素一起浮动，但是这样不好，会影响后面的元素定位
- 给父容器加上overflow:hidden，加上之后，形成BFC，需要计算超出的大小来隐藏，所以父容器会撑开放入子元素，同时计算浮动的子元素。但是一旦子元素大小超过父容器大小就会显示异常。
- 在浮动元素后面添加一个不浮动的空元素，父容器必须考虑浮动子元素的位置，子元素出现在浮动元素后面，所以显示出来就正常了，但是需要添加额外的html标签，这违背了语义网的原则
- 利用伪元素：after，它在父容器尾部自动创建一个子元素，这个原理和3一样，可以把它设置为height：0不显示，clear：both display:block，保证空白字符不浮动区块。
  (但是：after不支持IE6，只需要添加上zoom：1,这个是激活父元素的haslayout属性，让父元素拥有自己的布局



## 10.元素隐藏方法

- display：none元素不可见，不占据空间，资源会加载，DOM可以访问
- visibility:hidden元素不可见，不能点击，但占据空间，资源会加载，可以使用。
- opacity：0 元素不可见、可以点击，占据空间，可以使用。（不占据的话再加一个position absolute)(不能点击不占据空间 postion absolute+z-index:-1)(不能点击、占据空间 postion relative z-index:-1)



## 11. display：none和visibility:hidden的区别

- display：none元素不占据空间，visibility:hidden空间保留

- display：none会影响opacity过渡效果

- display会产生重绘回流，visibility:hidden只重绘

- display：none节点和子孙节点都不见，visibility:hidden的子孙节点可以设置visibility:visible显示。



## 12.层叠上下文

层叠上线文就是结界，其中的元素如果跟层叠上下文之外的元素发生层叠，就比较他们的层叠水平高低来显示。

创建的方法：postion为relative、absolute、fixed的元素设置z-index

顺序是：底层的border、background，负值z-index，块级盒子，浮动盒子，内联盒子，z-index：auto,正z-index



## 13.CSS box-sizing 的值有哪些？

有三种属性吧，一种是content-box，一种是border-box,还有一个是从父元素继承的inherit。

content-box一 宽高应用到内容框

border-box— 宽高包括了内边距和边框



## 14. 块级元素和行内元素

- 区别

  - 行内元素会在一行水平方向排列，块级元素独占一行
  - 块级元素可以包含行内元素和块级元素，行内只能包含文本和其他行内元素
  - 盒模型属性上，行内元素width height无效，pading上下无效

- 互换

  display：inline/block

- inline-block元素

  既可以设置高宽，又有inline元素不换行的特性。



## 15.三栏布局

- 浮动布局 float:left right，中间根据两边的width设置margin(要加两边的border)

- 绝对定位 父元素 relative，左右leftright各为0，absolute，中间元素设置margin

- BFC 左右float，中间overflow：hidden

- Flex 写法左中右，父元素display:flex，中间区域flex:1

- table布局，写法左中右，父元素display：table，三个元素table-cell

- 圣杯布局 写法中左右，中间width100%，左边margin-left -100%，右边margin-left= -width（-100px); 然后防遮住中间，左右相对定位relative。

- 双飞翼  中间再包裹一层，左，右。中间父元素 float left，width：100%。

  中间子元素 margin left right 左右的width。 左右float,左边margin-left -100%，右边margin-left -width



## 16.HTML5的新特点

很多语义化的标签

- canvas js绘图

- draggable属性 可拖动

- geolocationAPI 获取用户地理位置

- audio/video 音频 视频元素

- input类型增多，color、date、datetime、datetime-local、email、month、range、search、tel、time、url、week

- 表单元素增强 

  datalist 与input配合使用规定输入域的选项列表；keygen密钥;output定义不同类的输出。

- Web存储，sessionStorge针对一个session进行数据存储，关闭浏览器创港口后清除，localStorage没有事件限制，不过它可能会因为本地时间修改失效。

  不过大量复杂数据结构一般用indexDB

- Web worker 页面中执行脚本时，页面状态不可响应，直到脚本完成。在后台运行，独立于其他脚本，不会影响页面的性能。（相当于多线程并发）

- SSE server-sent-event 网页自动获取来自服务器的更新。用于接收服务器发送时间通知

- WebSocket 在单个TCP连接上进行全双工通讯的协议。只需要握手一次，形成快速通道，传输数据。客户端和服务器可以直接通过TCP交换数据。获取连接之后，可以用send发送数据，用onmessage接收服务器返回的数据。



## 17.DOCTYPE作用？严格模式和混杂模式如何区分？有何意义？

- 声明叫文件类型定义（DTD），位于文档中最前面，作用是为了告知浏览器应该用哪种文档类型规范来解析文档。
- 严格模式（标准模式),浏览器按照W3C标准来解析；混杂模式，向后兼容的解析方法，浏览器用自己的方式解析代码。
- 如何区分？
  用DTD来判断
  严格格式DTD——严格模式；
  有URL的过渡DTD——严格模式，没有URL的过渡DTD——混杂模式；
  DTD不存在/格式不对——混杂模式；
  HTML5没有严格和混杂之分
- 区分的意义
  严格模式的排版和js运行模式以浏览器支持的最高标准运行。如果只存在严格模式，那么很多旧网站站点无法工作。



## 18.为什么HTML5只需要写`<!DOCTYPE HTML>`

HTML5不基于SGML(标准通用标记语言)，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为。



## 19.src和href的区别

href 指向网络资源位置，建立当前文档和资源的连接，一般用于超链接

src将资源嵌入到当前文档中，在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也是如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。



## 20.什么是Shadow DOM?

Shadow DOM是浏览器的一种功能，能自动添加子元素，比如radio元素的controls，这些相关元素由浏览器生成。



## 21.为什么要强调CSS要放在header里，js放在尾部？

> ### DOMContentLoaded 和 load
>
> - DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片...
> - load 事件触发时，页面上所有的DOM，样式表，脚本，图片都已加载完成

构建Render树需要DOM和CSSOM，所以**HTML和CSS都会阻塞渲染**。所以需要让CSS**尽早加载**（如：放在头部），以**缩短首次渲染的时间**。

阻塞浏览器的解析，也就是说发现一个外链脚本时，**需等待脚本下载完成并执行后才会继续解析HTML**。

普通的脚本会阻塞浏览器解析，**加上defer或async属性，脚本就变成异步，可等到解析完毕再执行**

- async异步执行，异步下载完毕后就会执行，不确保执行顺序，一定在onload前，但不确定在DOMContentLoaded事件的前后
- defer延迟执行，相当于放在body最后（理论上在DOMContentLoaded事件前）

