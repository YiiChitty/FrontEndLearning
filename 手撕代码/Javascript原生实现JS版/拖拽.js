window.onload=function(){
    //drag目标是绝对定位状态
    var drag=document.getElementById('box');
    drag.onmousedown=function(e){
        e=e||window.event;
        //鼠标与拖拽元素的距离=鼠标与可视区边界的距离-拖拽元素与可视区的距离
        let diffX=e.clientX-drag.offsetLeft;
        let diffY=e.clientY-drag.offsetTop;
        drag.onmousemove=function(e){
            e=e||window.event;
            //拖拽元素的移动距离=鼠标当前与可视区边界的距离-鼠标与拖拽元素的距离
            let left=e.clientX-diffX;
            let top=e.clientY-diffY;
            //避免拖出可视区外
            if(left<0){ left=0;}
            else if(left>window.innerWidth-drag.offsetWidth){
                //超出了就放在innerWidth的位置
                left=window.innerWidth-drag.offsetWidth;
            }
            if(top<0) top=0;
            else if (top>window.innerHeight-drag.offsetHeight){
                top=window,innerHeight-drag.offsetHeight;
            }
            drag.style.left=left+'px';
            drag.style.top=top+'px';
        }
        drag.onmouseup=function(e){
            e=e||window.event;
            this.onmousemove=null;
            this.onmousedown=null;
        }
    }
}