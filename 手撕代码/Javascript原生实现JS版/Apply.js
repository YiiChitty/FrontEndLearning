//与call的区别是，第二个第二个参数传入的是数组
Function.prototype.Myapply()=function(context){
    if (typeof this !=='function'){
        throw TypeError('Error');
    }
    context=context||window;
    context.fn=this;
    let result;
    //判断是否存在数组参数,毕竟是可选参数
    if(arguments[1]){
        result=context.fn(...arguments[1]);
    }else{
        result=context.fn();
    }
    delete context.fn;
    return result;
}