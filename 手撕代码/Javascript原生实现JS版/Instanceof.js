//本质是看左边变量的原型链是否含有右边的原型
 function myInstanceof(left,right){
     //要找的原型
    let prototype=right.prototype;
    left=left._proto_;
    while(true){
        //全部遍历完都没有 false
        if(left===null||left==="undefined")  return false;
        //匹配上 true
        if(left===prototype) return true;
        //找下一个原型链
        left=left._proto_;
    }
}