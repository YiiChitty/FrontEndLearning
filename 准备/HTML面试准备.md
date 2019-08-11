# HTML面经问题

## 1.html中的meta标签是用来做什么的？

提供给机器解读的一些元数据。页面搜索引擎优化，定义页面实用语言等等。
属性有两个

1）**http-equiv+content**

参数有charset(编码格式)、expires(过期时间)、refresh(特定时间内自动刷新跳转)、pragma(禁止浏览器从本地计算机缓存中访问页面内容no-cache)、widows-target(设定页面在窗口中以独立页面展示，防止被当成frame页调用)、set-cookie(自定义cooke)、content-Type(字符集)

2）**name+content**

参数有keywords(关键字)、description(主要内容)、robots(none不被检索)、author、generator(使用的制作软件)、copyright、viewport(缩放比例)

## 2.DOCTYPE作用？严格模式和混杂模式如何区分？有何意义？

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

## 3. HTML5的新特点

很多语义化的标签

- canvas js绘图

- draggable属性 可拖动

- geolocationAPI 获取用户地理位置

- audio/video 音频 视频元素

- input类型增多，color、date、datetime、datetime-local、email、month、range、search、tel、time、url、week

- 表单元素增强 

  datalist 与input配合使用规定输入域的选项列表；keygen密钥;output定义不同类的输出。

- Web存储，sessionStorge针对一个session进行数据存储，关闭浏览器创港口后清除，localStorage没有事件限制，不过它可能会因为本地时间修改失效。不过大量复杂数据结构一般用indexDB

- Web worker 页面中执行脚本时，页面状态不可响应，直到脚本完成。在后台运行，独立于其他脚本，不会影响页面的性能。（相当于多线程并发）

- SSE server-sent-event 网页自动获取来自服务器的更新。用于接收服务器发送时间通知

- WebSocket 在单个TCP连接上进行全双工通讯的协议。只需要握手一次，形成快速通道，传输数据。客户端和服务器可以直接通过TCP交换数据。获取连接之后，可以用send发送数据，用onmessage接收服务器返回的数据。

- 新API 

  History、Command、Application cache ……

## 4.为什么HTML5只需要写`<!DOCTYPE HTML>`

HTML5不基于SGML(标准通用标记语言)，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为。

## 5.src和href的区别

href 指向网络资源位置，建立当前文档和资源的连接，一般用于超链接

src将资源嵌入到当前文档中，在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也是如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。

## 6.什么是Shadow DOM?

Shadow DOM是浏览器的一种功能，能自动添加子元素，比如radio元素的controls，这些相关元素由浏览器生成。

## 7. Canvas有什么用？

相当于在页面上新建了一个画布，可以用JS画图。只写一些基本的。

获取DOM,创建画布 getContext('2d');

- 矩形

  fillRect(x,y,width,height) 填充

  strokeRect(x,y,width,height) 边框

  clearRect(x,y,width,height)清除指定区域

- 路径

  创建起始点，画图，闭合路径。路径绘制完成，可以描边或者填充。

  beginPath()新建路径

  closePath()闭合路径

  stroke()描边

  fill()填充

- 移动笔触

  moveTo(x,y) 移动到某点

- 绘制直线

  lineTo(x,y) 从当前位置绘制到(x,y)的一条直线

- 绘制圆

  arc(x,y,radius,startAngle,endAngle,anticlockwise) 以(x,y)为圆心，radius为半径，startAngle和endAngle以X轴为准开始结束的弧度，anticlockwise为true顺时针，false逆时针。

  

## 8.不改变图片原始大小画到canvas上面

第一种，直接在坐标上画图，如果图片大小超出了画布也不缩放

drawImage(image,x,y);

第二种，绘制开始位置，缩放位置，图片会变形

drawImage(image,x1,y1,x2,y2);

第三种，从图片的某个坐标开始截图，截取m*n的大小。然后截的图片从canvas的x1,y1画到x2,y2。

drwaImage(image,xi,yi,m,n,x1,y1,x2,y2)



