//Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 
Object.prototype.mycreate=function(obj){
    function F(){}
    F.prototype=obj;
    return new F();
}

//其实也可以这么写
Object.prototype.mycreate=function(obj){
    return {'_protp_':obj};
}