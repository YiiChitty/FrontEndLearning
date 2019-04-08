##表单##
###1.表单提交###
表单提交有两种方式：<br/>
#####通用方式#####
不论是button还是input标签都可以，只需要type类型为submit即可，或者用图片提交，type类型为image。例如：<br/>
>     <input type="submit" value="Submit"> 
>     <button type="submit">Submit</button>
>     <input type="image" src="a.gif">
以上三种分为 通用提交按钮、自定义提交按钮和图像按钮

这种方式下，如果表单没有按钮则不会提交表单。以这种方式提交表单的时候，会在请求发送到服务器之前触发submit事件。可以在事件内验证表单数据，并决定是否允许表单提交（阻止submit的默认行为就可以阻止提交）。

#####自定义按钮提交#####
调用表单的submit()方法提交表单，这种方式无需表单包含提交按钮，何时都可以正常提交表单。
>     var form =document.getELementById('form');
>     form.submit();

区别在于submit()方法提交表单时，不会触发submit事件，所以要在调用方法前，先进行数据验证。


#####重复提交表单的问题解决方案######
**方案1：**第一次提交表单后禁用掉提交按钮<br/>
在onclick事件里面执行 $(this).attr('disabled','disabled');<br>
在点击一次后立马将按钮设置为不可用。
>     $("form").submit(function(){ 
>     $(":submit",this).attr("disabled","disabled"); 
>     });

但是这样就直接禁用了，如果提交失败呢？<br/>


JQuery有一个unbind方法，可以暂时禁用事件和方法的绑定。使用ajax的情况下，可以这样使用：
> 
>     var btn = $("#btn");
>     var bindBtn = function() {
>     	btn.click(function() {
>         	// 禁用按钮.防止重复点击
>             btn.unbind('click');
>             $.ajax({
>                 // ...
>              })
>              .done(function() {
>              	alert('提交成功');
>                 //成功
>              })
>              .fail(function() {
>              	//失败
>               	alert('服务器错误');
> 
>              // 提交失败 恢复提交按钮的监听
>              bindBtn();
>             });
>         });
>     }

