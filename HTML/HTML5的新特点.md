## HTML5的新特点

- 很多语义化的标签

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