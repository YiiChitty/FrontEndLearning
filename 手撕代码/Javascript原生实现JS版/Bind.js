//function.bind(thisArg[, arg1[, arg2[, ...]]])
//thisArg 调用绑定函数时作为this参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。
//             当使用bind在setTimeout中创建一个函数（作为回调提供）时，作为thisArg传递的任何原始值都将转换为object。
//             如果bind函数的参数列表为空，执行作用域的this将被视为新函数的thisArg。
//arg1, arg2, ...  当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。

//因为返回的是一个函数，所以要考虑new的情况
//由于链式调用，还要小心只有第一次传入的this才是被绑定的对象！！！！！如果是空的话，就绑在作用域上！！！
//f.bind(obj,1)(2)(3)
Function.prototype.myBind=function(context){
    if(typeof this !=='function'){
        throw TypeError ('Error');
    }
    const _this=this;
    const args=[...arguments].slice(1);
    return function F(){
        //如果采用的是new方法的话，就不动this
        if(this instanceof F){
            //链式调用要把新旧参数加上去哦
            return new _this(...args,...arguments);
        }else{
            return _this.apply(context,args.concat([...arguments]));
        }
    }
}