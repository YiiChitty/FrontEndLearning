## 字符串操作API

今天网易笔试之前，扫了一下18年的题目，里面有一道题让实现汉字转拼音的，用到了stringObject.localeCompare()方法。

好吧，又是一个新的盲区。

于是就连夜整理了字符串操作的API以加强记忆。

### 操作原字符串

- **replace**

用来查找匹配一个正则表达式的字符串，然后使用新字符串代替匹配的字符串。 



### 对原字符串无影响

- **concat**

将两个或者多个字符文本组合，返回一个新的字符串

- **substring  **

参数：起始位置和结束位置（不包括），返回字符串的一个子串

- **substr**

参数:起始位置和长度，返回字符串的子串

- **match**

找到一个或多个正则表达式的匹配。字符串匹配一个正则表达式内容，如果没有返回 null

- **slice**  

参数：起始位置，结束位置（不包括）。提取字符串的一部分，并返回一个新字符串（与 substring 相同）。 



### 查找类

- **indexOf**

检索字符串。返回字符串中一个子串第一处出现的索引,没有返回-1

- **lastIndexOf**

从后向前搜索字符串。返回字符串中一个子串最后一处出现的索引，没有返回-1

- **charAt**

返回在指定位置的字符。

- **search**

执行一个正则表达式匹配查找。如果查找成功，返回字符串中匹配的索引值。否则返回 -1 。 



### 变数组

- **split**

将字符串划分成子串，将一个字符串做成一个字符串数组。  



### 变格式

- **toLowerCase  **

将整个字符串转成小写字母。  

- **toUpperCase   **

将整个字符串转成大写字母。 

- **link**

字符串换成超链接 link(url)

- **small**

把字符串显示为小号字

- **big**

字符串显示为大号字



### 作比较

- **localeCompare**

参数：要与str进行比较的字符串，返回比较结果的数字，如果 stringObject 小于 target，则 localeCompare() 返回小于 0 的数。如果 stringObject 大于 target，则该方法返回大于 0 的数。如果两个字符串相等，或根据本地排序规则没有区别，该方法返回 0。



### API扩充

- 去除左边的空格 

```javascript
String.prototype.LTrim = function(){  
	return this.replace(/(^\s*)/g, "");  
}  
```

- 去除右边的空格

```js
String.prototype.Rtrim = function()  {  
	return this.replace(/(\s*$)/g, "");  
}  
```

- 去除前后空格

```js
String.prototype.Trim = function(){  
return this.replace(/(^\s*)|(\s*$)/g, "");  
}  
```

- 得到左边的字符串

```js
String.prototype.Left = function(len){
    if(isNaN(len)||len==null){  
		len = this.length;  
	}else{  
		if(parseInt(len)<0||parseInt(len)>this.length){  
			len = this.length;  
		}  
	}    
	return this.substr(0,len);  
}  
```

- 得到右边的字符串

```js
String.prototype.Right = function(len){
    if(isNaN(len)||len==null){
        len = this.length;
    }else{  
        if(parseInt(len)<0||parseInt(len)>this.length){  
            len = this.length;  
		}  
	}  
  	return this.substring(this.length-len,this.length);  
}  
```

- 判断是否是正确的长日期

```js
String.prototype.isLongDate = function(){  
	var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);  
	if(r==null){  
		return false;  
	}  
	var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);  
	return (d.getFullYear()==r[1]&&	(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);   
}  
```

- 判断是否是IP地址

```js
String.prototype.isIP = function(){  
  var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;  
  if (reSpaceCheck.test(this)){  
      this.match(reSpaceCheck);  
      if (RegExp.$1 <= 255 && RegExp.$1 >= 0 && RegExp.$2 <= 255 && RegExp.$2 >= 0 && RegExp.$3 <= 255 && RegExp.$3 >= 0 && RegExp.$4 <= 255 && RegExp.$4 >= 0) {  
          return true;      
      }else{  
          return false;  
      }  
   }else {  
       return false;  
   }    
}  
```

还有很多补充API，可以参考[这篇博客](https://blog.csdn.net/xinsong520/article/details/52160072)

 