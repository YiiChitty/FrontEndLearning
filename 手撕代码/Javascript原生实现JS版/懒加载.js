//首先html的img标签设置一个无关的标签比如说data，加载到的时候再替换成src
//思路就是到视口区了再替换过去加载

let img=document.querySelectorAll('img');
//可视区大小
let clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
function lazyload(){
    //滚动卷走的高度
    let  scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
    for(let i=0;i<imgs.length;i++){
        //在可视区冒出的高度
        let x=clientHeight+scrollTop-imgs[i].offsetTop;
        if(x>0&&x<clientHeight+imgs[i].height){
            img[i].src=img[i].getAttribute('data');
        }
    }
}
//addEventListener('scroll',lazyload)
//setInterval(lazyload,1000)