# 跨域

## 概述

当一个资源从与该资源本身所在服务器中不同域、协议、端口请求一个资源时，出于安全原因，浏览器限制从脚本内发起的跨源HTTP请求，XMLHttpRequest和Fetch API。

引入这个机制主要是用来防止CSRF攻击的（利用用户的登录态发起恶意请求）。

没有同源策略的情况下，A 网站可以被任意其他来源的 Ajax 访问到内容。如果你当前 A 网站还存在登录态，那么对方就可以通过 Ajax 获得你的任何信息。(当然跨域并不能完全阻止 CSRF)

**请求跨域了，那么请求到底发出去没有？** 

请求必然是发出去了，但是浏览器拦截了响应。你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会。因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。

> 所以，关于浏览器限制，不一定是浏览器限制了发起跨站请求，也可能是跨站请求可以正常发起，但返回结果被浏览器拦截。

那么跨域问题**如何解决**呢

## 1.JSONP

JSONP 的原理很简单，就是利用 `<script>` 标签没有跨域限制的漏洞。

通过 `<script>` 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。

```html
<script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
<script>
    function jsonp(data) {
    	console.log(data)
	}
</script>  
```

JSONP 使用简单且兼容性不错，但是只限于 `get` 请求。

在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP，以下是简单实现:

```javascript
function jsonp(url, jsonpCallback, success) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function(data) {
    success && success(data)
  }
  document.body.appendChild(script)
}
jsonp('http://xxx', 'callback', function(value) {
  console.log(value)
})
```



## 2.CORS概述

CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 `XDomainRequest` 来实现。

浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。

服务端设置 `Access-Control-Allow-Origin` 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为**简单请求和预检请求**。

另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），**浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务器是否允许该跨域请求。**

**服务器确认允许之后，才发起实际的HTTP请求**。 在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 cookie 和 HTTP 认证相关数据）。

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/CROS_01.png)

### 简单请求

不会触发 CORS 预检的请求称为简单请求，满足以下**所有条件**的才会被视为简单请求:

- 使用 GET、POST、HEAD 其中一种方法
- 只使用了如下的安全首部字段，不得人为设置其他首部字段
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type 仅限以下三种
    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded
  - HTML 头部 header filed 字段：DPR、Download、Save-Data、Viewport-Width、Width。
- 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload对象可以使用XMLHttpRequest.upload属性访问
- 请求中没有使用ReadableStream对象

### 预检请求

需预检的请求要求必须使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。

预检请求的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。

下面的请求会触发预检请求，其实**非简单请求之外的都会触发预检**

- 使用 PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH方法
- 人为设置了非规定内的其他首部字段，参考上面简单请求的安全字段集合，还要特别注意 Content-Type的类型
- XMLHttpRequestUpload对象注册了任何事件监听器
- 请求中使用了ReadableStream对象

### 请求附带身份凭证 => cookie

如果发起请求时设置WithCredentials标志设置为 true，从而向服务器发送cookie，但是如果服务器的响应中未携带Access-Control-Allow-Credentials: true，浏览器将不会把响应内容返回给请求的发送者。

对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin的值为`*`，必须是某个具体的域名。

注意，简单 GET 请求不会被预检；如果此类带有身份凭证请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。

### 完整请求流程

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/CROS_02.png)

## 3.document.domain

该方式只能用于**二级域名相同**的情况下，比如 `a.test.com` 和 `b.test.com`适用于该方式。

只需要给页面添加 `document.domain = 'test.com'` 表示二级域名都相同就可以实现跨域了。

## 4.postMessage

这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息。

```javascript
// 发送消息端
window.parent.postMessage('message', 'http://test.com')
// 接收消息端
var mc = new MessageChannel()
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin
  if (origin === 'http://test.com') {
    console.log('验证通过')
  }
})
```

