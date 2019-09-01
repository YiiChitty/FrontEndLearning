## CSS3

### 新特性

- 新增选择器：E：nth-child(n)  E:nth-last-child(n)
- Transition、Transform和Animation

```css
transition：
div{
    transition-property:width;
    transition-duration:1s;
    transition-timing-function:linear;
    transition-delay:25;
    /*简写形式*/
    transition:width 1s linear 25;
}

transform:
div{
    transform:rotate(7deg);
    -ms-transform:rotate(7deg);/*IE9*/
    -moz-transform:rotate(7deg);/*FireFox*/
    -webkit-transform:rotate(7deg);/*Safari和Chrome*/
    -o-transform:rotate(7deg);/*Opwea*/
}

animation:
@keyframes myAnimation{
    0%{background:red;width:100px;}
    25%{background:orange;width:200px;}
    50%{background:yellow;width:100px;}
    75%{background:green;width:200px;}
    100%{background:blue:width:100px;}
}
#box{
    animation:myAnimation 5s;
    width:100px;
    height:100px;
    background:red;
}
```

- 边框：box-shadow,border-radius
- 背景：background-clip,background-size
- 文字：text-shadow,text-overflow
- 字体：@font-face

```css
@font-face{
    font-family:myFirstFont;
    src:url(sansation_light,woff);
}
```

### 硬件加速

#### 让一个元素左移100px，使用left和transform有什么区别？

使用left等属性来设置动画会一直触发浏览器的重绘，而使用CSS3中国的transform会采用GPU硬件加速，不会触发重绘，性能更好

#### 硬件加速的原理

DOM树和CSSOM合并后形成Render树。渲染树中包含了大量的渲染元素，每一个渲染元素会被分到一个图层中，每个图层又会被加载到GPU形成渲染纹理。GPU中的transform是不会触发重绘的，这一点非常类似3D绘图功能。**最终这些使用tranform的图层都会由独立的合成器进程进行处理**。

总结：

**CSS3 transform创建了一个新的复合图层**，可以被GPU直接用来执行transform，从而不触发浏览器的重绘来达到加速的目的

以下情况会创建一个独立的复合图层：

- 3D或者CSS transform
- `<videl>`和`<canvas>`标签
- CSS filters
- 元素覆盖时，比如用了z-index属性

#### 如何硬件加速

以下CSS属性可以触发硬件加速：

- transform
- opacity
- filter
- will-change:告知浏览器哪一个属性即将变化
- 还可以通过transform的3D属性强制开始GPU加速

```css
transform:translateZ(0);
transform:rotateZ(360deg);
```

**使用硬件加速的注意事项：**

- 不能让每个元素都启用硬件加速，这样会占用很大的内存，使页面有很强的卡顿感，
- GPU渲染会影响字体的抗锯齿效果，这是因为GPU和CPU具有不同的渲染机制，即使最终硬件加速停止了，文本还是会在动画期间显示得很模糊。