//简单流程

//实例化
let xhr=new XMLHttpRequest();
//初始化
xhr.open(methond,url,async);
//发送请求
xhr.onreadystatechange=()=>{
    if(xhr.readyState===4&&xhr.status===200){
        console.log(xhr.responseText);
    }
}

//有Promise的实现

function ajax(options){
    //地址
    const url=options.url;
    //请求方法
    const method=options.methond.toLocalLowerCase()||'get';
    //默认为异步true
    const async=options.async;
    //请求参数
    const data=options.data;
    //实例化
    let xhr=new XMLHttpRequest();
    //超时时间
    if(options.timeout&&options.timeout>0){
        xhr.timeout=options.timeout;
    }

 
    return new Promise((resolve,reject)=>{
        xhr.ontimeout=()=>reject&&reject('请求超时');

        //状态变化回调
        xhr.onreadystatechange=()=>{
            if(xhr.readyState==4){
                if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                    resolve && resolve(xhr.responseText)
                }else{
                    reject&&reject();
                }
            }
        }

        //错误回调
        xhr.onerr=err=>reject&&reject();

        let paramArr=[];
        let encodeData;
        //处理请求参数
        if(data instanceof Object){
            for(let key in data){
                paramArr.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
            }
            encodeData=paramArr.join('&');
        }

        //get请求拼接参数
        if(method==='get'){
            //检查url中有没有?以及它的位置
            const index=url.indexOf('?');
            if(index===-1) url+='?';
            else if (index !==url.length -1)  url+='&';
            url += encodeData;
        }
    
        //初始化
        xhr.open(method,url,async);

        if(method ==='get') xhr.send(encodeData);
        else{  //post设置请求头
            xhr.setRequestHeader('Content-Type','application/x-www-form-unlencoded;charset=UTF-8');
            xjr.send(encodeData);
        }
    })
    
}