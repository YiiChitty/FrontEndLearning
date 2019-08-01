const PENDING="pending";
const RESOLVED="resolved";
const REJECTED="rejected";

function Promise(fn){
    const self=this;
    self.state=PENDING;
    self.value=null;
    self.reason=null;
    //保存then的回调函数，只有当pending时才会缓存
    self.onFullfilledCallback=[];
    self.onRejectedCallback=[];

    //resolve和reject函数
    function resolve(value){
        if(self.state==PENDING){
            self.state=RESOLVED;
            self.value=value;
            self.onFullfilledCallback.array.forEach(onfullfilled => {
              onfullfilled();  
            });
        }
    }
    function reject(reason){
        if(self.state==PENDING){
            self.state=REJECTED;
            self.reason=reason;
            self.onRejectedCallback.forEach(onrejected=>{
                onrejected();
            })
        }
    }
    //执行fn
    try{
        fn(resolve,reject);
    }catch(e){
        reject(e);
    }
}
//实现promise.then
Promise.prototype.then=function(onfullfilled,onrejected){
    const that=this;
    let p2Resolve,p2Reject;
    //生成一个新的Promise
    let p2=new Promise((resolve,reject)=>{
        p2Resolve=resolve;
        p2Reject=reject;
    });
    if(that.state==PENDING){
        that.onFullfilledCallback.push(()=>{
            onfullfilled(that.value);
            p2Resolve();
        });
        that.onRejectedCallback.push(()=>{
            onrejected(that.reason);
            p2Reject();
        })
    }else if (that.state==RESOLVED){
        onfullfilled(that.value);
        p2Resolve();
    }else if (that.state==REJECTED){
        onrejected(that.reason);
        p2Reject();
    }
    return p2;
}