# BFC

Block Formatting Context, 块级格式化上下文，它是一个独立的渲染区域，只有Block-level Box参与，它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

文档流分定位流、浮动流和 普通流 三种。而普通流其实就是指 BFC 中的 FC。

FC直译过来是格式化上下文，它是**页面中的一块渲染区域**，有一套渲染规则，决定了其**子元素如何布局，以及和其他元素之间的关系和作用**。

BFC 对布局的影响主要体现在对 **float** 和 **margin** 两个属性的处理。BFC 让 float 和 margin 这两个属性的表现更加符合我们的直觉。

根据 BFC 对其内部元素和外部元素的表现特性，将 BFC 的特性总结为 **对内部元素的包裹性** 及 **对外部元素的独立性**。

## 如何触发

满足下列条件之一就可触发 BFC。

- 根元素，即 HTML 元素
- `float` 的值不为 `none`
- `overflow` 的值不为 `visible`
- `display` 的值为 `inline-block`、`table-cell`、`table-caption`
- `position` 的值为 `absolute` 或 `fixed`

## BFC 有哪些作用？

BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。它与普通的块框类似，但不同之处在于:

1. 自适应两栏布局
2. 可以阻止元素被浮动元素覆盖
3. 可以包含浮动元素——清除内部浮动
4. 分属于不同的 BFC 时可以阻止 margin 重叠

## BFC 布局规则

1. 内部的 Box 会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定。**属于同一个 BFC 的两个相邻 Box** 的 margin 会发生重叠。
3. 每个元素的 margin box 的左边，与包含块 border box 的左边相接触（对于从左向右的格式化，否则相反）。即使存在浮动也是如此。
4. BFC 的区域不会与 float box 重叠。
5. BFC 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算 BFC 的高度时，浮动元素参与计算。

接下来分别去试一下：

### BFC 布局规则1：内部的 Box 会在垂直方向， 一个接一个地放置

布局规则1就是我们**平常div一行一行块级放置的样式**。

```html
 <div class="container">
	<div class="box1"></div>
	<div class="box2"></div>
	<div class="box3"></div>
	<div class="box4"></div>
 </div>
```

```css
.container{
    /*构建BFC*/
	position: absolute;
	height: auto;
}
.box3{
    float: left;
}
```

![BFC rule1](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/BFC_01.png)

这里只写了关键的样式，我在另一个资源库上传了具体的代码，可以从这里[预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/BFC/testRule01.html)到截图的页面。

### BFC 布局规则2：Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠

决定块级盒在包含块中与相邻块盒的垂直间距的是margin-box。在常规的文档流中，两个兄弟盒子之间的垂直距离是由他们的外边距所决定的，但是不是外边距之和，而是以较大的那个为准。

在BFC内部也是这样：

```html
<div class="container">
	<div class="box1"></div>
	<div class="box2"></div>
</div>
```

```css
.container {
	overflow: hidden;/*构建一个bfc*/
}
.box1 {
    margin: 10px 0;
}
.box2 {
	margin: 20px 0;
}
```

以上依旧只写了关键代码，效果是box1和box2的间隔为20px，效果如下：

![BFC rule2](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/BFC_02.png)

浏览器环境[预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/BFC/testRule02.html)

不过，也并非没有办法解决，特性5就说了容器里面的子元素不糊印象外面元素，给box1或者box2处于不同的BFC就可以了。

**结论：**当两个相邻块级子元素**分属于不同的 BFC 时可以阻止 margin 重叠**。

**操作方法**：给其中一个 div 外面包一个 div，然后通过触发外面这个 div 的 BFC，就可以阻止这两个 div 的 margin 重叠。

写法很简单，文章内就不多写了，可以直接[点此预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/BFC/testRule02solve.html)

### BFC 布局规则3：每个元素的 margin box 的左边，与包含块 border-box 的左边相接触（对于从左向右的格式化，否则相反）。即使存在浮动也是如此。

```html
<div class="par">
    <div class="child"></div>
    <div class="child"></div>
</div>
// 给这两个子div加浮动，浮动的结果，如果没有清除浮动的话，父div不会将下面两个div包裹,但还是在父div的范围之内。
```

**解析**：给这两个子 div 加浮动，浮动的结果，如果没有清除浮动的话，父 div 不会将下面两个 div 包裹，但还是在父 div 的范围之内，**左浮动是子 div 的左边接触父 div 的 border-box 的左边，右浮动是子 div 的左边接触父 div 的 border-box 的右边**，除非设置 margin 来撑开距离，否则一直是这个规则。

这个时候 **BFC 的作用 3：可以包含浮动元素——清除内部浮动** 登场！

给父 div 加上 `overflow: hidden;`

**清除浮动原理**：触发父 div 的 BFC 属性，**使下面的子 div 都处在父 div 的同一 BFC 区域之内**，此时已成功清除浮动。

![BFC_wordsfloat](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/BFC_rule03.webp)

还可以使父 div 向同一个方向浮动来达到清除浮动的目的，清除浮动的原理是两个 div 都位于同一个浮动的 BFC 区域之中。

### BFC 布局规则4：BFC 区域不会与 float box 重叠。

直接用两栏布局来说明。

如果左边固定宽度，右边自适应，随浏览器窗口大小变化而变化

```html
<div class="left"></div>
<div class="right"></div>
```

```css
.left {
	float: left;
    width: 200px;
	height: 300px;
}
        
.right {
	overflow: hidden;/*创建bfc */
	height: 300px;
}
```

[点此预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/BFC/testRule04.html)

### BFC 与 Layout

IE 作为浏览器中的奇葩，当然不可能按部就班的支持 BFC 标准，于是乎 IE 中就有了 Layout 这个东西。**Layout 和 BFC 基本是等价的**，为了处理 IE 的兼容性，在需要触发 BFC 时吗，我们除了需要用触发条件中的 CSS 属性来触发 BFC，还需要针对 IE 浏览器使用 **zoom: 1** 来触发 IE 浏览器的 Layout。

以上的几个例子都体现了 BFC 布局规则的第 5 条——

### BFC 布局规则5：BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之亦然。

------

**文本环绕 float**：

```html
<div style="float: left; width: 100px; height: 100px; background: #000;">
</div>
<div style="height: 200px; background: #AAA;">
    <div style=" width: 30px; height: 30px; background: red;"></div>
    <p>content</p> <p>content</p> <p>content</p> <p>content</p> <p>content</p>
</div>
```

![BFC_wordsfloat](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/BFC_wordsfloat.webp)

问题：为什么灰色背景的 div 左上角被覆盖后，红色 div 被覆盖，但是文本却没有被覆盖？

**解决**：

**float 的定义和用法**：

float 属性定义元素在哪个方向上浮动。以往这个属性总应用于图像，**使文本围绕在图像周围**，不过在 CSS 中，**任何元素都可以浮动**。浮动元素会生成一个块级框，而不论它本身是何种元素。

![BFC_float](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/BFC_float.webp)

从上图可以看到，float 属性确实生效，将 float 隐藏后，下面还有一个红色的 div，这个 div 是被黑色 div 所覆盖掉的。**div 会被 float 覆盖，而文本却没有被 float 覆盖**，是因为 **float 当初设计的时候就是为了使文本围绕在浮动对象的周围。**



## 块级盒Block-level Box到底是啥？

![BFC_box](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/BFC_Box.webp)

我们平常说的盒子是由 margin、border、padding、content组成的，实际上每种类型的四条边定义了一个盒子，分别是`content box`、`padding box`、`border box`、`margin box`，这四种类型的盒子一直存在，即使他们的值为0。决定块盒在包含块中与相邻块盒的垂直间距的便是 `margin-box`。

**提示**：Box 之间的距离虽然也可以使用 padding 来控制，但是此时实际上还是属于 box 内部里面，而且使用 padding 来控制的话就不能再使用 border 属性了。