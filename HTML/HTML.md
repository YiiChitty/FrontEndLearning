# HTML

<br/>

## HTML和XHTML
HTML格式比较松散，XHTML基于XML，语法严格标准，其元素必须正确地嵌套，元素必须关闭、标签必须小写、必须有根元素等。

## DOCTYPE作用？严格模式和混杂模式如何区分？有何意义？


- <!DOCTYPE>声明叫文件类型定义（DTD），位于文档中最前面，作用是为了告知浏览器应该用哪种文档类型规范来解析文档。




- 严格模式（标准模式),浏览器按照W3C标准来解析；混杂模式，向后兼容的解析方法，浏览器用自己的方式解析代码。



- 如何区分？<br/>用DTD来判断<br/>严格格式DTD——严格模式；<br/>有URL的过渡DTD——严格模式，没有URL的过渡DTD——混杂模式；<br/>DTD不存在/格式不对——混杂模式；<br/>HTML5没有严格和混杂之分

- 区分的意义<br/>严格模式的排版和js运行模式以浏览器支持的最高标准运行。如果只存在严格模式，那么很多旧网站站点无法工作。

## 为什么HTML5只需要写`<!DOCTYPE HTML>`

HTML5不基于SGML(标准通用标记语言)，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为。

## HTML5有哪些新特性

- **语义化标签** <br/>
8组：header、nav、footer、section、aside、artice、detailes、summary、dialog（对话框）
- **智能表单** <br/>
1.input输入类型增多<br/>
color(颜色选取)、date、datetime（UTC时间）、datetime-local（日期时间无时区）、email、month、number、range（一定范围内数字值）、search、tel（电话号码）、time、url、week <br/>
2.新增表单元素 <br/>
datalist（输入域选项列表）keygen(验证用户)、output（不同类型输出）
3.新增表单属性
placehoder（提示语）、required（boolean，不能为空）、pattern(正则)、min/max、step(合法数字间隔）、height/width(image高宽)、autofocus(boolean，自动获取焦点)、mutiple（boolean,多选）

- **音频和视频** <br/>
`<audio>`控制音频，controls属性提供播放暂停音量控件，支持mp3、wav、ogg<br/>
`<video>`控制视频，controls属性提供播放暂停音量控件，也可以用dom操作来控制，如play()、pause();支持多个source元素，每个元素可以链接不同的视频文件，浏览器使用第一个可识别的模式（MP4、WebM、ogg)

- **canvas和svg** <br/>

- **地理位置**
- **拖放的API**
- **web worker**
- **web storage**
- **web socket**

## 语义化的好处

HTML文档结构更清晰、布局合理、可读性强；便于浏览器解析和搜索引擎解析；提高代码可维护性

## HTML的实体及使用场景

HTML实体有三种定义方式：名称、十进制、十六进制。
例如符号<，它可以被定义为` &lt;`` &#60;` `&#x0003C;`

如果要在HTML文档中显示特殊字符，就可以使用HTML实体，它还可以预防XSS(跨站脚本攻击)XSS通常会把脚本代码注入到HTML文档中，再解析执行。使用HTML实体后只能让代码打印，不执行。

## 可转义的字符或符号

五类：ASCII字符、ISO 8859-1字符、数学符号、希腊字母、其他字符（中文空格、引号、省略号）等

## HTML元素分类

1.基本类型 <br/>
虚类型：br input img <br/>
原始文本元素：script style <br/>
可转义的原始文本元素：textarea title等 <br/>
外部元素：svg MathML <br/>
普通元素 <br/>
<br/>
2.按盒模型分类 <br/>
**块级元素**：独占一行，可以接受宽高，不设置宽度，默认父级的100%  <br/>
所有的容器标签（div,hx,li,dt,dd）和`<p>`

**行级元素**：与其他行内元素并排，没有宽高，默认宽度文字宽度 <br/>
文本级标签(span,a,b,i,u,em)除了`<p>`都是

可以通过display属性互换
display：inline 
行内元素（可并排;不能设置高宽）

display：block
块级元素（可以设高宽、独占一行、不设置宽度占满父级）

## 什么是Shadow DOM?

Shadow DOM是浏览器的一种功能，能自动添加子元素，比如radio元素的controls，这些相关元素由浏览器生成。

## src和href的区别

href 指向网络资源位置，建立当前文档和资源的连接，一般用于超链接

src将资源嵌入到当前文档中，在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也是如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。

## iframe的优缺点
优点 <br/>

- 可以用来加载速度较慢的第三方资源，例如广告、图标等
- 可以用作安全沙箱
- 可以并行下载脚本
- 可以解决跨域问题

缺点<br/>

- 加载代价昂贵，即使是空的页面也需要时间
- 会阻塞页面的onload事件，iframe加载完后，父页面才会触发load
- 没有语义
- 增加http请求数
- 搜索引擎爬虫不能很好的处理iframe的内容，不利于搜索引擎优化
