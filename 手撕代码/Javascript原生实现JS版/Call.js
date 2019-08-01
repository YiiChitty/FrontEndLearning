//传入一个this 绑定上所有的属性
Function.prototype.MyCall=function(context){
    if(typeof this !=='function'){
        throw new TypeError('error')
    }
    context=context||window;
    context.fn=this;
    const args=[...arguments].slice(1);//除去要绑定的对象，剩下参数应该绑定进去
    const result=context.fn(...args);
    delete context.fn;
    return result;
}