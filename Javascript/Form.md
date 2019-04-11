## 表单 ##

### 1.表单提交 ###

表单提交有两种方式：<br/>

##### 通用方式 #####

不论是button还是input标签都可以，只需要type类型为submit即可，或者用图片提交，type类型为image。例如：<br/>

```html
    <input type="submit" value="Submit"
    <button type="submit">Submit</button>
    <input type="image" src="a.gif">
```

> 以上三种分为 通用提交按钮、自定义提交按钮和图像按钮

这种方式下，如果表单没有按钮则不会提交表单。以这种方式提交表单的时候，会在请求发送到服务器之前触发submit事件。可以在事件内验证表单数据，并决定是否允许表单提交（阻止submit的默认行为就可以阻止提交）。

##### 自定义按钮提交 #####

调用表单的submit()方法提交表单，这种方式无需表单包含提交按钮，何时都可以正常提交表单。

```javascript
    var form =document.getELementById('form');
    form.submit();
```

区别在于submit()方法提交表单时，不会触发submit事件，所以要在调用方法前，先进行数据验证。


##### 重复提交表单的问题解决方案 ######

 **方案1：** 第一次提交表单后禁用掉提交按钮<br/>
在onclick事件里面执行 $(this).attr('disabled','disabled');<br>
在点击一次后立马将按钮设置为不可用。

```javascript
    $("form").submit(function(){ 
    	$(":submit",this).attr("disabled",true); 
    });
```

之后处理完成之后，再去掉disabled属性即可。

```javascript
     $('form :submit').removeAttr("disabled");
```

当然还有一种办法：JQuery有一个unbind方法，可以暂时禁用事件和方法的绑定。在使用ajax的情况下，可以这样使用：

```html
<input type="button" value="Submit" id="btn">
```
    
JS代码如下：<br>

```javascript
    var btn = $("#btn");
    var bindBtn = function() {
    	btn.click(function() {
        	// 禁用按钮.防止重复点击
            btn.unbind('click');
            $.ajax({
                // ...
             })
             .done(function() {
             	//成功
				alert('提交成功'); 
             })
             .fail(function() {
             	//失败
              	alert('服务器错误');
                // 提交失败 恢复提交按钮的监听
                bindBtn();
            });
        });
    }
```

 **方案2：** 利用onsubmit事件处理程序取消后续的表单提交操作<br/>
基本思路就是利用onsubmit属性，加上一个flag，在点击一次之后，只返回false，从而阻止表单的提交。

```html
    <form action="" method="post" name="form1" onsubmit="return dbClick();">
    	<input name="myname" type="text">
    	<input type="submit" name="FormSubmit" id="submitbtn" value="提交">
    </form>
```

JS代码如下：

```javascript
    var dbClickFlag = true;
    function dbClick() {
    	//也可以在这里直接禁用掉提交按钮
    	//$('#submitbtn').attr("disabled", true);
    	if (dbClickFlag) {
    		dbClickFlag = false;
    		return true;
    	}
    	return dbClickFlag;
    };
```

### 2. 重置表单 ###

使用type属性为"reset"的input或者button即可，也可以使用from的reset方法。与调用submit()方法不同，reset()会像点击重置按钮一样触发reset事件。

### 3.表单字段 ###

每个表单都有elements属性，是表单中所有表单元素（字段）的集合。这个集合是一个 **有序列表** 。<br>

用法实例： <br/>
如果表单中有三个字段的 **name** 都是"color",那么 form.elements["color"] 的length将会是3。获取第一个元素可以用:

```javascript
    var firstColorField=form.elements["color"][0];
```

表单字段除了fieldset标签之外，其他都拥有一组相同的属性、方法和事件：<br>

<p>
 <b>属性:</b>
<ul>
 <li> disabled: 布尔值，当前字段是否被禁用 </li>
 <li> form: 指向当前字段所属表单的指针，只读，可以用来检查所属表单 </li>
 <li> name: 当前字段的名称 </li>
 <li> readOnly: 布尔值，当前字段是否可读 </li>
 <li> tabIndex: 当前字段切换序号 </li>
 <li> type: 当前字段的类型，不如checkbox，radio等，不建议使用 </li>	
 <li> value: 当前字段将被提交到服务器的值 </li>	
</ul>
</p>

<p>
 <b>方法:</b>
<ul>
 <li> focus(): 焦点设置到当前字段 </li>
 <li> blur(): 移走焦点 </li>
</ul>
</p>

> 一般情况下，加载完毕后就移动到表单第一个字段。
> 
>```javascript
>     document.form.elements[0].focus();
> ```
> 
> 但是，这样的话，如果第一个字段是input元素，且type为"hidden",或者使用了display，visibility隐藏了，都会导致错误。<br>
> H5 提供了一个新的属性： autofocus 。
> 
> ```html
>     <input type="text" id="firstElement" autofocus>
> ```
> 
> 为了兼容性考虑，可以用以下方法:
>  ```javascript
>     var element=document.getElementById('firstElement');
>     if(! elemet.autofocus){
>     	element.focus();
>     }
>   ```

<p>
 <b>事件:</b>
<ul>
 <li> focus: 获得焦点时触发 </li>
 <li> blur: 焦点消失时触发 </li>
 <li> change: 对input和textarea元素，在他们失去焦点且value值变化后触发；对select元素，选项改版后就触发 </li>
</ul>
</p>

### 4.文本框 ###
有两种方式来展现文本框，一种是使用input元素的单行文本框，另一种是使用textarea的多行文本框。<br>
input文本框主要的属性有：
size 设置可以显示的字符；value 设置默认值；maxlength 设置可以接受的最大字符数。<br>
textarea文本框主要的属性有：
rows 指定文本框的字符行数；cols 指定文本框的字符列。设置初始值写在头尾两个标签之间，不能设置最大字符数。

> 处理文本框时，最好不要用DOM方法，直接使用 textBox.value 取值。

#### 选择文本 ####
select()方法：选中文本框所有文本。

select事件：选择了文本框中的文本时触发。标准浏览器是当用户选择了文本且释放鼠标才触发，ie8-是选择了一个字符就会触发，不用释放鼠标。调用select()也会触发。

 **获取选中的文本** 

H5中引入了selectionStart 和 selectionEnd 两个属性，帮助获取用户选中的文本。在标准浏览器中，可以这样使用：
```javascript
    function getSelectedText(textbox){
    	return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
    }
```

但是在IE8-不支持这两个属性，它包含一个document.selection对象，保存着用户在整个文档范围内选择的文档。可以与select事件一起使用，用户选择了文本框中文本，触发了select事件，要取得选择的文本，先创建一个范围，然后再把文本从里面取出来。所以兼容IE8-的代码可以这样写：
```javascript
    function getSelectedText(textbox){
    	//这里也可以用typeof textbox.selectionStart =="number"来判断是不是IE8-	
		if(textbox.selectionStart){
       		return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
    	}else{
       		return document.selection.createRange().text;
    	}
    }
```

 **选中部分文本**

H5为所有的文本框提供了一个setSelectionRange()方法，接受要选择的第一个字符的索引和要选择的最后一个字符索引+1 两个参数。要看到选中的文本，必须在调用之前或之后焦点设置到文本框。

IE8不支持这种方法，思路大致如下：先用createTextRange()创建一个范围，用collapse()将范围折叠到文本框的开始位置，再用moveStart(),此时范围起点终点都移动到了相同位置，再用moveEnd()移动到要选中的结束位置，最后用select()选取即可。

兼容的实现方法如下：
```javascript
    function selectText(textbox,startIndex,endIndex){
    	if(textbox.setSelectionRange){
    		textbox.setSelectionRange(startIndex,endIndex);
    	}else{
    		var range=textbox.createTextRange();
    		range.collapse(true);
			range.moveStart("character",startIndex);
			range.moveEnd("character",endIndex-startIndex);
			range.select();
    	}
		textbox.focus();
    }
```

 **屏蔽字符**

向文本框插入字符操作的是keypress事件，因此可以通过阻止这个事件的默认行为，来屏蔽掉一些字符符。keypress事件对应的是键盘上的字符编码，所以可以通过检测ASCII码来决定如何响应。

以 **一个只能输入数字的文本框** 为例

1.验证数字：先为keypress事件绑定功能，可以通过EventUtil.getCharCode(event)来获取字符编码，然后使用String.fromCharCode()将字符编码换成字符串，再用正则表达式 “/\d/” 来测试该字符串是是否是数值。

2.避免屏蔽常用键：理论上用户按下字符键才会触发keypress事件，但是FF和Safari3.1-会对上、下、退格、删除键也触发keypress事件。在FF中，非字符触发的keypress字符编码为0；在Safari3-中，非字符触发的字符编码为8.所以不屏蔽字符编码小于10的键即可。

3.避免屏蔽Ctrl+组合热键：除IE外，以上两步完成的代码也会屏蔽掉复制粘贴的热键、还有其他用ctrl进行的组合键，因此还需要加上判断用户是否按下ctrl键。

所以，最终的js代码为： 
```javascript     
    EventUtil.addHander(textbox, "keypress", function(event) {
    	event = EventUtil.getEvent(event);
    	var target = EventUtil.getTarget(event);
    	var charCode = EventUtil.getCharCode(event);
    	if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
    		//阻止默认行为
    		EventUtil.preventDefault(event);
    	}
    });
```

>EventUtil的封装代码可以参考Event.md的内容。 


 **剪贴板操作**

剪贴板共有6个事件

<ul>
<li>beforecopy:发生复制操作前触发</li>
<li>copy：在复制操作时触发</li>
<li>beforecut：在剪切之前触发</li>
<li>cut:剪切时触发</li>
<li>beforepaste:在粘贴之前触发</li>
<li>paste:在粘贴时触发</li>
</ul> 

访问剪贴板的数据，可以使用clipboardData对象，在标准浏览器中，这个对象是相应event对象的属性，只在处理剪贴板事件的时候才有效；但在ie中，这个对象是window对象的属性，可以随时访问。

clipboardData对象有三个方法:
<ul>
<li>getData(x):取数据，接收要取得的数据格式 IE:text url 标准浏览器：text（实际是MIME类型，text/plain）</li>
<li>setData(x1,x2):设置数据，第一个参数接收数据格式，第二个参数是要放剪贴板的文本</li>
<li>clearData():清空剪贴板</li>
</ul>

为了保证兼容性，最好是指在发生剪贴板事件的时候才使用clipboardData这个对象，所以需要继续封装EventUtil.js。

```javascript
    //剪贴板获取内容
    getClipboardText: function(event) {
       var clipboardData = (event.clipboardData || window.clipboardData);
       return clipboardData.getData("text");
    },  
    //设置剪贴板内容
    setclipboardText: function(event, text) {
    	if (event.clipboardData) { //标准
       		return event.clipboardData.setData("text/plain", text);
       	} else if (window.clipboardData) { //IE
       		return event.clipboardData.setData("text", text);
       	}
    },
```

通常要确保粘贴到文本框中的文本包含某些字符或者要求符合某种格式要求的时候，就需要访问剪贴板，再做验证。

还是以 **只接受数字的文本框** 为例：
需要在paste事件中，判断剪贴板的值是否有效，如果无效就取消它的默认行为。<br/>

```javascript
    EventUtil.addHander(textbox, "psate", function(event) {
    	event = EventUtil.getEvent(event);
    	var text = EventUtil.getClipboardText(event);
    	if (!/^\d*$/.test(text)) {
    		EventUtil.preventDefault(event);
    	}
    });
```

 **文本框自动切换焦点**

这是表单的一种常见需求，当用户填写完当前字段时，自动将焦点切换到下一个字段。实现自动切换焦点，需要知道用户已经输入了一定长度的数据。

例如，输入手机号，有最大长度分别为3,4,4的三个文本框，再前一个文本框字符达到最大数量后，自动将焦点切换到下一个。
```html
    <form action="" name="form">
    	<input type="text" name="tel1" id="tel1" maxlength="3">
    	<input type="text" name="tel2" id="tel2" maxlength="4">
    	<input type="text" name="tel3" id="tel3" maxlength="4">
    </form>
```

具体实现方法如下：

```javascript
(function() {
	//获取文本框
    var textbox1 = document.getElementById("tel1");
    var textbox2 = document.getElementById("tel2");
    var textbox3 = document.getElementById("tel3");
	//给文本框绑定事件,释放按键之后进行判断
    EventUtil.addHander(textbox1, "keyup", tabForward);
    EventUtil.addHander(textbox2, "keyup", tabForward);
    EventUtil.addHander(textbox3, "keyup", tabForward);
	//封装方法
    function tabForward(event) {
    	event = EventUtil.getEvent(event);
    	var target = EventUtil.getTarget(event);
		//判断是否达到最大长度
    	if (target.value.length == target.maxLength) {
    		//获取文本框所在的form,利用form的elements属性定位下一个元素，并设置为焦点
			var form = target.form;
    		for (var i = 0; i < form.elements.length; i++) {
    			if (form.elements[i] == target) {
    				if (form.elements[i + 1]) {
    					form.elements[i + 1].focus();
    				}
    				return;
    			}
    		}
    	}
   	}
})();
```

 **H5表单约束**

为了更好地在表单提交到服务器之前进行数据验证，H5提供了一些新功能，即便是js被禁用或者未能加载成功，都可以确保基本的验证。但是，适用范围为：FF 4+,Safari 5+,Chrome,Opera 10+。<br>
<b>有用，但略鸡肋……</b> ╮(╯—╰)╭

<ol>
  <li>新增必填字段属性required<br>
  <label>标注了required的字段在提交表单时不能空。适用于input标签、textarea标签和select标签字段。</label>
  </li>
  <li>新增input标签的输入类型<br>
  <label>新类型有：<br>
  email:要求输入文本必须符合电子邮件地址模式，但是并不靠谱，因为“-@-”也会通过。<br>
  url:要求输入的文本必须符合URL模式<br>
  需要注意：如果不给input设置required属性，空文本框也会验证通过。 感觉比较鸡肋 :) <br>
  <blockquote>其实input还有一些类型，这些都要求填写某种基于数字的值，比如说number，datetime之类的，但是浏览器的支持不太好。对于这些数字类型的，可以添加min、max、step(min到max的刻度)等。
  </blockquote>
  </label>
  </li>
  <li>新增约束属性pattern<br>
  <label>这个属性的值是一个正则表达式，用于匹配文本框的值。如果要从头到尾进行模式匹配，那正则表达式的开头和末尾都不用加^和$符号。</label>
  </li>
  <li>新增检测字段是否有效方法checkValidity()<br>
  <label>所有表单的字段都有这个方法，如果值有效，返回true，否则返回false。字段判断的有效性依据是上面提到的1-3的约束。<br>
  如果要检测整个表单是否有效，可以在表单自身调用checkValidity()。
  </label>
  </li>
  <li>新增禁用验证属性novalidate</li>
  <label>通过设置novalidate，让表单不验证。如果一个表单有多个提交按钮，要指定某个按钮不必验证表单，可以直接在此按钮上加上formnovalidate属性。</label>
</ol>

### 5.选择框 ###

除了表单所有字段的公共属性方法，HTMLSelectElement还有以下自有的属性和方法。
<p>
 <b>属性:</b>
<ul>
 <li> mutiple:布尔值，是否允许多选 </li>
 <li> options:控件中所有option元素的HTMLCollection </li>
 <li> selectedIndex:基于0的选中项索引，默认不选是-1，多选的控件只保存选中项中第一项索引。 </li>
 <li> size：选择框可见行数</li>
</ul>
</p>
<p>
  <b>方法：</b>
  <ul>
  <li>add(newOption,relOption):添加新的选项，位置在relOption之前。</li>
  <li>remove(index):根据索引，移除选项</li>
  </ul>
</p>

在DOM中，每个option元素都有一个HTMLOptionElement对象表示，包括以下属性:
<ul>
  <li>index:当前选项在options中的索引</li>
  <li>label:当前选项标签</li>
  <li>selected：布尔值，是否被选中</li>
  <li>text：选项文本</li>
  <li>value：选项的值</li>
</ul>

 **添加选项**

大致有三种方式：

方式1：先创建后添加文本节点，并设置value特性，最后添加到选择框中。
```javascript
    var newOption=document.createElement("option");
    newOption.appdendChild(document.createTextNode("选项文本"));
    newOption.setAttribute("value","选项的值");
    selectbox.appendChild(newOption);
```
方式2：用Option的构造函数创建，兼容DOM的浏览器返回一个option元素，再用appendChild添加到选择框中。
```javascript
    var newOption=new Option("选项文本","选项的值");
    selectbox.appendChild(newOption);
```
>IE不支持！

方式3：使用选择框add()<br>
方法有两个参数：添加的新元素、要插入的元素索引。IE对第二个参数可选，如果指定，必须是一个索引；标准浏览器要求必须指定第二个参数。
所以要想在所有元素之后插入新选项可以这样做：<br>
```javascript
    var newOption=new Option("选项文本","选项的值");
    selectbox.add(newOption,undefined);
```

 **移除选项**

方式1：使用DOM的removeChild()

```javascript
	//移除第一个选项
	selectbox.removeChild(selectbox.options[0]);
```

方式2：使用选择框的remove()

```javascript
	//移除第一个选项
	selectbox.remove(0);
```

方式3：设置相应的选项为null
```javascript
	//移除第一个选项
	//Options集合对象是HTMLCollection，这是个动态的集合，移除第一个后面的会自动向前移动
	selectbox.options[0]=null;
```
 
 **移动选项**

将选择框中某一项移动到某个位置，最适合的DOM方法应该是insertBefore()。
举个栗子：

```javascript
	//把第一个option往后移一个位置
	var movedOption = selectbox.options[0];
	selectbox.insertBefore(movedOption,selectbox.options[movedOption.index+2]);
```

### 6.富文本编辑 ###

实现方式1：利用iframe

技术的本质是页面中嵌入一个包含空页面的iframe，通过设置designMode属性为on，让这个空白页面可以被编辑，编辑的对象就是空白页面内body元素的HTML代码。

举个栗子：创建一个类似文本框的可编辑区字段

```html
    <iframe name="richedit" style="height:100px;width:100px;" src="blank.htm"></iframe>
    <script>
    window.onload=function(){
    	frames["richedit"].document.designMode="on";
    };
    </script>
```

实现方式2：contenteditable属性

contenteditable属性可以应用给页面中的任何元素，然后用户立即可编辑该元素。它有三个可能的值：true打开，false关闭，inherit从父元素继承。

这种方式的好处是，不需要创建空白页等，且可以便捷地打开或关闭编辑模式。

举个栗子：创建一个可编辑的div

```html
	<div class="editbox" id="richedit" contenteditable></div>
	<script>
		var div=document.getElementById("richedit");
		div.contenteditable="true";
	</script>
```

 **表单与富文本**

富文本编辑是用iframe或者修改其他元素contenteditable属性，而非表单控件实现的，所以富文本的HTML不会被自动提交给服务器，需要手动提取并提交。

通常可以加一个隐藏的表单字段，让它的值等于iframe中提取出来的HTML。在表单提交之前，取出iframe中的HTML，并将其插入到隐藏的字段中。（或者是从contenteditable的元素中提取出）

写个栗子吧，比如说隐藏的字段name为"comments"，给submit事件绑定：

```javascript
	EventUtil.addHander(form,"submit",function(event){
		event=EventUtil.getEvent(event);
		var target=EventUtil.getTarget(event);
		//这里的target是form
		target.elements["comments"].value=frames["richedit"].document.body.innerHTML;
		//如果是contenteditable的元素
		//target.elements["comments"].value=document.getElementById("richedit").innerHTML;
	});
```
如果想在通过submit()手工提交表单，要记得在form.submit()之前先执行上面的操作。


----------
## 总结 ##
表单感觉在生产系统中用得蛮多的，尤其是那些mis系统。比如说教务系统、财务报账系统等等。之前对这块，算是半桶水吧，现在学完这部分感觉清楚了不少。后面复习完ajax之后，再来补充一下关于表单序列化这部分的内容。