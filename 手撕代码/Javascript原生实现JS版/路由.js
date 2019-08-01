//hash路由
class Route{
    constructor(){
        //存储对象
        this.routes=[];
        //当前hash
        this.currentHash=''
        //绑定this.避免监听时this指向改变
        this.freshRoute=this.freshRoute.bind(this);
        //监听
        window.addEventListener('load',this.freshRoute,false);
        window.addEventListener('hashmessage',this.freshRoute,false);
    }
    //存储
    storeRoute(path,cb){
        this.routes[path]=cb||function(){};
    }
}