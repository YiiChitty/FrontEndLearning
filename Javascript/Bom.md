## Bom

## 1.window

### 窗口位置

窗口相对于屏幕左边和上面的位置

FireFox：ScreenX、ScreenY

Safari、Opera、Chrome: ScreenLeft、ScreenTop

 ```js
var leftPos=window.ScreenLeft||window.ScreenX;
var topPos=window.ScreenTop||window.screenY;
 ```

### 页面视口大小

```js
var pageWidth=window.innerWidth;
var pageHeight=window.innerHeight;
if(typeof pageWidth!='number'){
    if(document.compatMode=="CSS1Compat"){
        //标准模式
        pageWidth.document.documentElement.clientWidth;
        pageHeight.document.documentElement.clientHeight;
    }else{
        //兼容模式
        pageWidth=document.body.clientWidth;
        pageHeight=docunment.body.clientHeight;
    }
}
```

## 2.Location

提供了当前窗口中加载文档有关的信息，还提供了一些导航功能。

location对象既是window对象属性，又是document对象属性。window.location===document.location

### 访问片段

Location可以将URL解析为独立的片段，访问片段的方法：

- href  返回或设置当前文档的url
- hostname 返回不带端口号的主域名
- host 域名加端口
- port 端口
- search 返回url中查询字符串的部分 ？及之后的内容
- hash 返回url中#后面的内容
- protocol 使用的协议http 和 https
- pathname url中的目录或者文件名



### 查询字符串参数实例

解析查询字符串，返回一个包含所有参数的对象

```js
function getQuerySstringArgs(){
    let qs=(location.search.length>0 ? loacation.seach:""),
    arg={};
    
    itemArr=qs.length ? qs.split('&'):[],
        item=null,name=null,value=null,len=itemArr.length;
    
    for(let i=0;i<len;i++){
        item=item[i].split("=");
        name=decodeURLComponent(item[0]);
        value=decodeURLComponent(item[1]);
        
        if(name.length){
            arg[name]=value;
        }
    }
    return arg;
}
```



### 位置操作

- location.assign() 立即打开新的url，并且在浏览器的历史记录中生成一条记录。

修改location对象的其他属性也可以改变当前加载的页面，每次修改（除了hash）页面都会重新加载。

任何一种方式修改url后，都会在浏览器的历史记录中生成一条新纪录，因而点击后退可以回退到前一个页面。如果要禁用掉的话，可以用replace（）方法。

- location.replace(url) 转到新的url地址里，但是不会再历史记录中生成新纪录。

- location.reload() 重载当前页面

  默认 页面会以最有效的方式重新加载，也就是说，如果页面没有变过，就会从缓存重新加载。如果要强制从服务器加载，则需要传入参数true。



## 3.navigator对象

常用：

navigator.userAgent 返回用户代理字符串（浏览器版本等）

navigator.cookieEnabled 返回浏览器是否启用cookie

## 4.screen对象

用来表明客户端能力，包括浏览器窗口外部的显示器信息，比如宽高等。

## 5. history对象

记录用户从打开窗口开始算起的上网历史记录。

- history.go() 前进或后退制定的页面数，也可以传递字符串参数，会跳转到历史记录中包含该字符串的第一个位置，可能后退也可能前进。
- history.back() 后退一页
- history.forward() 前进一页
- history.length 历史记录数量 判断是否是第一个页面，可以判断length是否等于0