//使用setTimeout模拟setInterval
//避免因执行时间导致间隔执行时间不一致
setTimeout(function(){
    //do something 
    //arguments.callee引用该函数体内当前正在执行的函数
    setTimeout(arguments.callee,500);
},500)