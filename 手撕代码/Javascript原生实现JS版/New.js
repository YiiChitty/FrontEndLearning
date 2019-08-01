//使用new时，1 内部生成一个obj 2 链接到原型 3 obj绑定this(使用构造函数的this) 4 返回新对象（原始值的话忽略，如果是对象的话就返回这个对象）
Function.prototype.myNew()=function(func,...args){
    let obj={};
    obj._proto_=func.prototype;
    let result=func.apply(obj,args);
    return result instanceof Object? result:obj;
}

//不过其实也可以用Object.create
//以构造函数的原型对象为原型，创建一个空对象；等价于 创建一个新的对象，把他的_proto_指向prototype
Function.prototype.myNew()=function(func,...args){
    let obj=Object.create(func.prototype);
    let result=func.apply(obj,args);
    return result instanceof Object? result:obj;
}