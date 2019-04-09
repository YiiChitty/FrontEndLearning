## 表单 ##

### 1.表单提交 ###

表单提交有两种方式：<br/>

##### 通用方式 #####

不论是button还是input标签都可以，只需要type类型为submit即可，或者用图片提交，type类型为image。例如：<br/>

    <input type="submit" value="Submit"
    <button type="submit">Submit</button>
    <input type="image" src="a.gif">

> 以上三种分为 通用提交按钮、自定义提交按钮和图像按钮

这种方式下，如果表单没有按钮则不会提交表单。以这种方式提交表单的时候，会在请求发送到服务器之前触发submit事件。可以在事件内验证表单数据，并决定是否允许表单提交（阻止submit的默认行为就可以阻止提交）。

##### 自定义按钮提交 #####

调用表单的submit()方法提交表单，这种方式无需表单包含提交按钮，何时都可以正常提交表单。

    var form =document.getELementById('form');
    form.submit();

区别在于submit()方法提交表单时，不会触发submit事件，所以要在调用方法前，先进行数据验证。


##### 重复提交表单的问题解决方案 ######

 **方案1：** 第一次提交表单后禁用掉提交按钮<br/>
在onclick事件里面执行 $(this).attr('disabled','disabled');<br>
在点击一次后立马将按钮设置为不可用。

    ```javascript
    $("form").submit(function(){ 
    	$(":submit",this).attr("disabled",true); 
    });

之后处理完成之后，再去掉disabled属性即可。

     $('form :submit').removeAttr("disabled");

当然还有一种办法：JQuery有一个unbind方法，可以暂时禁用事件和方法的绑定。在使用ajax的情况下，可以这样使用：

    <input type="button" value="Submit" id="btn">
    
JS代码如下：<br>

    var btn = $("#btn");
    var bindBtn = function() {
    	btn.click(function() {
        	// 禁用按钮.防止重复点击
            btn.unbind('click');
            $.ajax({
                // ...
             })
             .done(function() {
             	alert('提交成功');
                //成功
             })
             .fail(function() {
             	//失败
              	alert('服务器错误');

             // 提交失败 恢复提交按钮的监听
             bindBtn();
            });
        });
    }

 **方案2：** 利用onsubmit事件处理程序取消后续的表单提交操作<br/>
基本思路就是利用onsubmit属性，加上一个flag，在点击一次之后，只返回false，从而阻止表单的提交。

    <form action="" method="post" name="form1" onsubmit="return dbClick();">
    	<input name="myname" type="text">
    	<input type="submit" name="FormSubmit" id="submitbtn" value="提交">
    </form>

JS代码如下：

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

### 2. 重置表单 ###

使用type属性为"reset"的input或者button即可，也可以使用from的reset方法。与调用submit()方法不同，reset()会像点击重置按钮一样触发reset事件。

### 3.表单字段 ###

每个表单都有elements属性，是表单中所有表单元素（字段）的集合。这个集合是一个 **有序列表** 。<br>

用法实例： <br/>
如果表单中有三个字段的 **name** 都是"color",那么 form.elements["color"] 的length将会是3。获取第一个元素可以用:

    var firstColorField=form.elements["color"][0]

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
> `document.form.elements[0].focus();`
> 
> 但是，这样的话，如果第一个字段是input元素，且type为"hidden",或者使用了display，visibility隐藏了，都会导致错误。<br>
> H5 提供了一个新的属性： autofocus 。
> 
> `<input type="text" id="firstElement" autofocus>`
> 
> 为了兼容性考虑，可以用以下方法:
>  
>     var element=document.getElementById('firstElement');
>     if(! elemet.autofocus){
>     	element.focus();
>     }

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

    function getSelectedText(textbox){
    	return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
    }

但是在IE8-不支持这两个属性，它包含一个document.selection对象，保存着用户在整个文档范围内选择的文档。可以与select事件一起使用，用户选择了文本框中文本，触发了select事件，要取得选择的文本，先创建一个范围，然后再把文本从里面取出来。所以兼容IE8-的代码可以这样写：

    function getSelectedText(textbox){
    	//这里也可以用typeof textbox.selectionStart =="number"来判断是不是IE8-	
		if(textbox.selectionStart){
       		return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
    	}else{
       		return document.selection.createRange().text;
    	}
    }

 **选中部分文本**

H5为所有的文本框提供了一个setSelectionRange()方法，接受要选择的第一个字符的索引和要选择的最后一个字符索引+1 两个参数。要看到选中的文本，必须在调用之前或之后焦点设置到文本框。

IE8不支持这种方法，思路大致如下：先用createTextRange()创建一个范围，用collapse()将范围折叠到文本框的开始位置，再用moveStart(),此时范围起点终点都移动到了相同位置，再用moveEnd()移动到要选中的结束位置，最后用select()选取即可。

兼容的实现方法如下：

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

