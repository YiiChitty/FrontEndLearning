//实现一个继承方法

//借助构造函数继承实例属性
function Child(){
    Parent.call(this);
}

//寄生继承原型
(function(){
    let Super=function(){}
    Super.prototype=Parent.prototype;
    Child.prototype=new Super();
})()