# CSS

## 三种将CSS样式应用到元素上的方式有什么区别

![](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/css_01.png)

## 基本概念

### 流

**“流”又叫文档流，是css的一种基本定位和布局机制**。流是html的一种抽象概念，暗喻这种排列布局方式好像水流一样自然自动。“流体布局”是html默认的布局机制，如你写的html不用css，默认自上而下（块级元素如`div`）从左到右（内联元素如`span`）堆砌的布局方式。

### 块级元素和内联元素

块级元素是指单独撑满一行的元素，如`div、ul、li、table、p、h1`等元素。这些元素的display值默认是`block、table、list-item`等。

内联元素又叫行内元素，指只占据它对应标签的边框所包含的空间的元素，这些元素如果父元素宽度足够则并排在一行显示的，如`span、a、em、i、img、td`等。这些元素的display值默认是`inline、inline-block、inline-table、table-cell`等。

实际开发中，我们经常把`display`计算值为`inline` `inline-block` `inline-table` `table-cell`的元素叫做内联元素，而把`display`计算值为`block`的元素叫做块级元素。

### width：auto和height：auto

`width`、`height`的默认值都是`auto`。

对于块级元素，流体布局之下`width: auto`自适应撑满父元素宽度。这里的撑满并不同于`width: 100%`的固定宽度，而是像水一样能够根据`margin`不同而自适应父元素的宽度。

对于内联元素，`width: auto`则呈现出包裹性，即由子元素的宽度决定。

无论内联元素还是块级元素，`height: auto`都是呈现包裹性，即高度由子级元素撑开。

css的属性非常有意思，**正常流下，如果块级元素的`width`是个固定值，`margin`是`auto`，则`margin`会撑满剩下的空间；如果`margin`是固定值，`width`是`auto`，则`width`会撑满剩下的空间**。这就是流体布局的根本所在。

>
> 注意父元素`height: auto`会导致子元素`height: 100%`百分比失效。如果想要子元素的height:100%生效，那么父元素需要设定显式高度值；或者使用绝对定位。（绝对定位元素百分比根据padding box计算，非绝对定位元素百分比是根据content box计算）

### 盒模型（盒尺寸）

元素的内在盒子是由`margin box`、`border box`、`padding box`、`content box`组成的，这四个盒子由外到内构成了盒模型。

IE模型： `box-sizing: border-box`  此模式下，元素的宽度计算为`border+padding+content`的宽度总和。

w3c标准模型： `box-sizing: content-box` 此模式下，元素的宽度计算为`content`的宽度。

由于`content-box`在计算宽度的时候不包含`border pading`很烦人，而且又是默认值，可以采用以下代码重置样式：

```
:root {
  box-sizing: border-box;    
}
* {
  box-sizing: inherit;
}
```

### 外在盒子和内在盒子

外在盒子是决定元素排列方式的盒子，即决定盒子具有块级特性还是内联特性的盒子。外在盒子负责结构布局。

内在盒子是决定元素内部一

些属性是否生效的盒子。内在盒子负责内容显示。

如 `display: inline-table;` 外在盒子就是`inline`，内在盒子就是`table`。外在盒子决定了元素要像内联元素一样并排在一排显示，内在盒子则决定了元素可以设置宽高、垂直方向的margin等属性。

### 内联盒模型

内联元素是指外在盒子是内联盒子的元素。从表现来说，内联元素的典型特征就是可以和文字在一行显示。文字也是内联元素。图片、按钮、输入框、下拉框等替换元素也是内联元素。内联盒模型是指内联元素包含的几个盒子。

1.内容区域(content area)。内容区域指的是一种围绕文字看不见的盒子，其大小仅受字符本身特性控制，本质上是一个字符盒子(character box)；但是图片这样的替换元素，其显示内容不是文字，因此内容区域可以看成是元素自身。

2.内联盒子(inline box)。“内联盒子”不会让内容成块显示，而是排成一行，这里的内联盒子指的是元素的“外在盒子”，用来决定元素是内联还是块级。该盒子又可以细分为“内联盒子”和“匿名内联盒子”。

```html
<p>
    这是匿名内联盒子
    <em>外部有内联标签，这里是内联盒子。</em>
</p>
```

3.行框盒子(line box)。每一行就是一个行框盒子，每个行框盒子都是由一个个内联盒子组成，如果换行，那就是两个行框盒子。如果一行里面没有内联元素如一个空的`div`标签，则不会形成行框盒子。

> 注意：line-height是作用在行框盒子上的，并最终决定高度(替换元素除外)。

4.包含盒子(containing box)。此盒子由一行一行的“行框盒子”组成（css规范中，并没有“包含盒子”的说法，更准确的称呼是“包含块”(containing block)。多行文字组成一个包含块，一个包含块有若干个行框盒子。

5.幽灵空白节点：内联元素的每个行框盒子前面有一个“空白节点”，这个“空白节点”不占据任何宽度，无法选中获取，但是又实实在在存在，表现就如同文本节点一样。

### 替换元素

根据“外在盒子”是内联还是块级，我们把元素分为内联元素和块级元素，而根据内容是否可替换，我们把元素分为可替换元素和非替换元素。

替换元素是指内容可以替换的元素，实际上就是`content box`可以被替换的元素。

- 如存在`src=""`属性的`<img> <audio> <video> <iframe>`元素和可以输入文本的`<input> <select> <textarea>`元素等。

- 所有替换元素都是内联元素，默认`display`属性是`inline`或`inline-block`（除了`input[type="hidden"]`默认`display: none;`）。

- 替换元素有自己默认的样式、尺寸（根据浏览器不同而不同），而且其`vertical-align`属性默认是`bottom`（非替换元素默认值是`baseline`）。

- 替换元素固有尺寸无法更改，width和height改变的是content-box的宽高，而默认替换元素的object-fit是fill，也就是会填充content-box，因此看上去像是改变了固有尺寸。

- 替换元素before和after伪元素无效。

### css权重和超越

css选择器权重列表如下：

| 权重  | 选择器                                                       |
| ----- | ------------------------------------------------------------ |
| 10000 | !important（`!important`并不是选择器，但是权重却是最高的）   |
| 1000  | 内联样式：style=""                                           |
| 100   | ID选择器：`#idName{...}`                                     |
| 10    | 类、伪类、属性选择器：`.className{...}` / `:hover{...}` / `[type="text"] ={...}` |
| 1     | 标签、伪元素选择器：`div{...}` / `:after{...}`               |
| 0     | 通用选择器（*）、子选择器（>）、相邻选择器（+）、同胞选择器（~） |

看一道题：

```css
// 假设下面样式都作用于同一个节点元素`span`，判断下面哪个样式会生效
body#god div.dad span.son {width: 200px;}
body#god span#test {width: 250px;}
```

第一个样式权重计算是`(body+div+span=3) + (#god+.dad+.son=120) = 123`;第二个样式权重计算是`(body+span=2) + (#god+#test=200) = 202`，`202 > 123`所以最终计算结果是取`width: 250px;`。

在css中，`!important`的权重相当的高，但是由于宽高会被`max-width`/`min-width`覆盖，所以有时`!important`会失效。

```css
width: 100px!important;
min-width: 200px;
```

上面代码计算之后会被引擎解析成：

```css
width: 200px;
```

### 盒模型四个大魔头

#### Content

对于非替换元素如`div`,其`content`就是div内部的元素。 而对于替换元素，其`content`就是可替换部分的内容。

CSS中的`content`属性主要用于伪元素`:before/:after`中。

#### padding

基本是四个里最稳定的一个，需要注意：

- 大部分情况下，会把元素重置为box-sizing:border-box。所以宽高的计算是包含了padding的，给人一种`padding`也是`content box`一部分的感觉，好像`line-height`属性也作用于`padding`上。但实际上，元素真正的内容的宽高只是`content box`的宽高，而`line-height`属性是不作用于`padding`的。

- `padding`不可为负值，但是可以为百分比值。为百分比时水平和垂直方向的`padding`都是相对于父级元素宽度计算的。将一个`div`设为`padding: 100%`就能得到一个正方形，`padding: 10% 50%`可以得到一个宽高比 5:1 的矩形。

  比如下面的：

  ```html
  <div class=box>
      <div class=b1></div>
  </div>
  ```

  ```cs
  .box{width:200px;}
  .b1{padding:10% 50%;background:red}
  ```

  能生成100*20的矩形。

- `padding`配合`background-clip`属性，可以制作一些特殊形状：

  ```html
  <div class="icon1"></div>
  <div class="icon2"></div>
  ```

  ```css
  .icon1{
  	box-sizing: border-box;
  	display: inline-block;
  	width: 12px;
  	height: 10px;
  	padding: 2px 0;
  	border-top: 2px solid red;
  	border-bottom: 2px solid red;
  	background: red;
  	/*规定背景绘制区域*/
  	background-clip: content-box;
  }
  .icon2 {
  	box-sizing: border-box;
  	display: inline-block;
  	width: 12px;
  	height: 12px;
  	padding: 2px;
  	border: 2px solid red;
  	/*添加圆角边框*/
  	border-radius: 50%;
  	background-color: red;
  	background-clip: content-box;
  }
  ```

  [效果预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/基础/AmazingPadding.html)

  > 用的是github的htmlpreview.github.io，等待时间会较长，页面在**CSSWorld**这个Repository下。

#### margin

- 作为外边距，`margin`属性并不会参与盒子宽度的计算，但通过设置`margin`为负值，能改变元素水平方向的尺寸：

  ```html
  <div>test</div>
  <style>
      div{
          margin:0 -100px;
      }
  </style>
  //文字消失
  ```

  此时`div`元素的宽度是比父级元素的宽度大`200px`的。但是这种情况只会发生在元素是流布局的时候，即元素`width`是默认的`auto`并且可以撑满一行的时候。如果元素设定了宽度，或者元素设置了`float: left` / `position: absolute`这样的属性改变了流体布局，那么`margin`为负也无法改变元素的宽度了。

- 块级元素的垂直方向会发生`margin`合并，存在以下三种场景：

  - 相邻兄弟元素之间`margin`合并；
  - 父元素`margin-top`和子元素`margin-top`，父元素`margin-bottom`和子元素`margin-bottom`；
  - 空块级元素自身的`margin-top`和`margin-botom`合并，例子如下。

  要阻止`margin`合并，可以：

  1. 把元素放到`bfc`中；
  2. 设置`border`或`padding`阻隔`margin`；
  3. 用内联元素（如文字）阻隔；
  4.  给父元素设定高度。

- `margin`的百分比值跟`padding`一样，垂直方向的`margin`和水平方向上的一样都是相对于父元素宽度计算的。

  ```html
  <div class="box">
    <div></div>
  </div>
  <style>
    .box{
      overflow: hidden;
      background-color: lightblue;
    }
    .box > div{
      margin: 50%;
    }
  </style>
  ```

  此时 .box 是一个宽高比 2:1 的矩形，因为空块级元素自身的垂直方向的`margin`发生了合并。

  这里父元素设置`overflow: hidden`是利用 `bfc` 的特性阻止子元素的`margin`和父元素合并，换成其他 `bfc` 特性或者设置 `1px` 的 `border` / `padding`都是可以达到效果的。

- `margin: auto`能在块级元素设定宽高之后自动填充剩余宽高。

  `margin: auto`自动填充触发的前提条件是元素在对应的水平或垂直方向具有自动填充特性，显然默认情况下块级元素的高度是不具备这个条件的。

  典型应用是块级元素水平居中的实现：

  ```css
  display:block
  width:200px;
  margin:0 auto;
  ```

  `auto`的特性是，如果两侧都是`auto`，则两侧均分剩余宽度；如果一侧`margin`是固定的，另一侧是`auto`，则这一侧`auto`为剩余宽度。

  除了水平方向，垂直方向的`margin`也能实现垂直居中，但是需要元素在垂直方向具有自动填充特性，而这个特性可以利用`position`实现：

  ```css
  position:absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  width: 200px;
  height: 200px;
  margin: auto;
  ```

#### border

`border`主要作用是做边框。`border-style`属性的值有`none/solid/dashed/dotted/double`（无\加粗\虚线\虚点\双横）等，基本看名字就能猜出来了。

`border-width`属性的默认值是`3px`，是为了照顾`border-style: double`。值得注意的是，`border-color`默认是跟随字体的颜色，相当于默认设置了`border-color: currentColor`一样。

`border`另一广受欢迎的功能就是图形构建，特别是做应用广泛的三角形：

```html
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

```css
div{
  float: left;
  margin: 20px;
}
div:nth-child(1){
  width: 20px;
  height: 20px;
  border: 20px solid;
  border-color: blue red orange green;
}
div:nth-child(2){
  width: 20px;
  height: 20px;
  border: 20px solid;
  border-color: blue transparent transparent transparent;
}
div:nth-child(3){
  border: 20px solid;
  border-color: blue transparent transparent transparent;
}
div:nth-child(4){
  border-style: solid;
  border-width: 40px 20px;
  border-color: blue transparent transparent transparent;
}
div:nth-child(5){
  border-style: solid;
  border-width: 40px 20px;
  border-color: blue red transparent transparent;
}
```

其实就是将其他三个边框的颜色设置透明，并把宽高设为 0 。图中4-5两个图形，是通过调整边框宽度和颜色调整三角形的形状，把最后一个图的红色改为蓝色，则是一个直角三角形了。

[效果预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/基础/AmazingBorder.html)

> 用的是github的htmlpreview.github.io，等待时间会较长，页面在**CSSWorld**这个Repository下。

### line-height和vertical-align

`line-height`和`vertical-align`是控制元素垂直对齐的两大属性。

#### 字母 x 的角色

在内联元素的垂直方向对齐中，基线是最为重要的概念。`line-height`定义的就是两基线之间的距离，`vertical-align`的默认值就是基线。基线的定义则是字母 x 的下边缘。

css中有个概念叫`x-height`，指的是小写字母 x 的高度。`vertical-align: middle`对齐的就是基线往上1/2`x-height`高度的地方，可以理解为近似字母 x 的交叉点。

css中除了`px/em/rem`等，还有个单位是`ex`。指的就是小写字母x的高度，即`x-height`

#### line-height

- `line-height`各类属性值

  `normal`： 默认值`normal`其实是类型为数值的变量，根据浏览器和字体'font-family'不同而不同，一般约为 1.2 。

  数值和百分比：最终会被计算为带单位的值，具体计算方法就是乘以字体大小`font-size`。

  长度值：就是`100px`这样带单位的值。

  这几类值的继承特性不同：`line-height`是数值的元素的子元素继承的就是这个数值，百分比/长度值继承的都是计算后得出的带单位的值（px）。

- `line-height`的作用：

  `line-height`属性用于设置多行元素的空间量，如多行文本的间距。

  

  对块级元素来说，`line-height`决定了**行框盒子的最小高度**。注意是行框盒子的最小高度，而不是块级元素的实际高度。

  对于非替代的 inline 元素，它用于计算行框盒子的高度。此时内联元素的行框盒子的高度完全由`line-height`决定，不受其他任何属性的影响。

- `line-height`实现垂直居中的本质：行距

  行距是指一行文本和相邻文本之间的距离。行距 = `line-height` — `font-size`。

  行距具有上下等分的机制：意思就是文字上下的行距是一样的，各占一半，这也是`line-height`能让内联元素垂直居中的原因。

  ```html
  <div>x</div>
  ```

  ```css
  div{
      line-height:200px;
      border:1px solid;
  }
  ```

  字母x上下行距各占一半，共同撑起了`div`。

  [效果预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/基础/Line-height垂直居中.html)

  ```html
  <div>
      x
      <span></span>
  </div>
  ```

  ```css
  div{
      line-height:100px;
      border:1px solid;
  }
  span{
      display:inline-block;
      width:100px;
      height:100px;
      background:red;
      vertical-align:middle;
  }
  ```

  多了个`display: inline-block`的`span`元素，但是此处的`span`元素并没有影响`div`元素的高度，而只是靠着`vertical-align: middle`属性将自身中心点对齐了字母x的交叉点实现垂直居中而已。

  `div`元素的高度仍然和上图一模一样，由字母x和行距共同撑起。此时如果删除字母x，`div`的高度不变，因为`span`元素的行框盒子前会产生幽灵空白节点，而幽灵空白节点+行高也能撑起`div`。

  [效果预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/基础/line-height和vertical-align垂直居中.html)

- 内联元素的大值特性

  直接上题：

  ```html
  <div class="box">
    <span>asdf</span>
  </div>
  ```

  ```css
  .box {
    line-height: 100px;
    background: lightgreen;
  }
  .box span {
    line-height: 30px;
  }
  ```

  此时box的高度是多少？

  > `span`元素的行框盒子前存在一个幽灵空白节点，而这个幽灵空白节点的行高是100px。所以box的高度是：100px

  ```css
  .box {
    line-height: 30px;
    background: lightgreen;
  }
  .box span {
    line-height: 100px;
  }
  ```

  修改一下，现在的box高度是多少？

  > 幽灵空白节点的行高是30px，但是这时span元素的行高是100px。所以box的行高是100px。

  结论：无论内联元素的`line-height`如何设置，最终父元素的高度都是数值大的那个`line-height`决定的。

#### vertical-align

- `vertical-align`的属性值

  线类： 如`baseline（默认值）` `top` `middle` `bottom`（`baseline`使元素的基线与父元素的基线对齐，`middle`使元素的中部与父元素的基线往上`x-height`的一半对齐。`top` `bottom`使元素及其后代元素的底部与整行或整块的底部对齐。）

  文本类： `text-top` `text-bottom`（使元素的顶部与父元素的字体顶部对齐。）

  上标下标： `sub` `super`（使元素的基线与父元素的下标基线对齐。）

  数值： `20px` `2em` （默认值`baseline`相当于数值的 0 。使元素的基线对齐到父元素的基线之上的给定长度，数值正值是基线往上偏移，负值是往下偏移，借此可以实现元素垂直方向精确对齐。）

  百分比： `20%` （使元素的基线对齐到父元素的基线之上的给定百分比，该百分比是line-height属性的百分比。）

- `vertical-align` 的作用前提

  **vertical-align属性起作用的前提必须是作用在内联元素上。** 

  即`display`计算值为`inline` `inline-block` `inline-table` `table-cell`的元素。所以如果元素设置了`float: left`或者`position: absolute`，则其`vertical-align`属性不能生效，因为此时元素的`display`计算值为`block`了。

#### 关于line-height和vertical-align的探讨

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/css_02.png)

有时候会遇见像上面这样，高度与设置的不一致的情况。

为什么div实际高度比我设置的行高大？

内联元素的默认对齐方式是`baseline`，所以此时此时`span`元素的基线是和父元素的基线相对齐的，而此时父元素的基线在哪呢？

父元素的基线其实就是行框盒子前的幽灵空白节点的基线。把幽灵空白节点具象化为字母`x`可能容易理解些：

由于`div`行高是`30px`，所以字母`x`和`span`元素的高度都是`30px`。但是字母x的`font-size`较小，`span`元素的`font-size`较大，而行高一样的情况下`font-size`越大基线的位置越偏下，所以两者的基线不在同一水平线上。

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/css_03.jpg)

由于内联元素默认基线对齐，所以字母`x`和`span`元素发生了位移以使基线对齐，导致`div`高度变大。而此时字母`x`的半行距比`span`元素的半行距大，大出的部分就是`div`的高度增加的部分。

#### 关于display：inline-block的基线

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/css_04.jpg)

图中`span`元素设置了`display: inline-block`和宽高，从而撑起了父元素`div`的高度，但`span`本身并无`margin`属性，那为什么底部和`div`下边缘之间会有空隙呢？

先说基线问题，对于一个设置了`display: inline-block`的元素：

1. 如果元素内部没有内联元素，则该元素基线就是该元素下边缘；
2. 如果元素设置了`overflow`为`hidden auto scroll`，则其基线就是该元素下边缘；
3. 如果元素内部还有内联元素，则其基线就是内部最后一行内联元素的基线。

回到上面的问题：

`span`的行框盒子前，还存在一个幽灵空白节点。由于`span`元素默认基线对齐，所以`span`元素的基线也就是其下边缘是和幽灵空白节点的基线对齐的。从而导致幽灵空白节点基线下面的半行距撑高了`div`元素，造成了空隙。

那么如果span元素中有内联元素的话,自然基线就是内部最后一行内联元素的基线了。

![img](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/css_05.jpg)

> 注意：由于替换元素内部不可能再有别的元素，所以其基线位置永远位于下边缘。

#### 基线问题如何解决

间隙产生本质上是由基线对齐引发的错位造成的，源头上是`vertical-align`和`line-height`共同造成的，所以要想解决这个问题，只要直接或间接改造两个属性中的一个就行了：

1. 给元素设置块状化`display: block`使`vertical-align`属性失效；
2. 尝试不同的`vertical-align`值如`bottom/middle/top`；
3. 直接修改`line-height`值；
4. 如果`line-height`为相对值如`1.4`，设置`font-size: 0`间接改变`line-height`。

#### 用vertical-align实现一个水平垂直居中弹窗

```html
<div class="container">
  <div class="dialog">自适应弹出层</div>
</div>
<style>
.container{
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0, 0, 0, .15);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}
.container:after{
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.dialog{
  display: inline-block;
  width: 400px;
  height: 400px;
  vertical-align: middle;
  text-align: left;
  font-size: 14px;
  white-space: normal;
  background: white;
}
</style>
```

[效果预览](http://htmlpreview.github.io/?https://github.com/YiiChitty/CSSWorld/blob/master/基础/vertical-align实现水平垂直居中弹窗.html)

原理就是container设置了`text-align: center`，使得内部div实现了水平居中；创建了伪类，`display: inline-block;height: 100%;vertical-align: middle`;之后内部div又inline-block变成了内联元素，通过`vertical-align: middle`实现了垂直居中。

## BFC

Block Formatting Context, 块级格式化上下文，它是一个独立的渲染区域，只有Block-level Box参与，它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

文档流分 、定位流、浮动流和 普通流 三种。而普通流其实就是指 BFC 中的 FC。

FC直译过来是格式化上下文，它是**页面中的一块渲染区域**，有一套渲染规则，决定了其**子元素如何布局，以及和其他元素之间的关系和作用**。

BFC 对布局的影响主要体现在对 **float** 和 **margin** 两个属性的处理。BFC 让 float 和 margin 这两个属性的表现更加符合我们的直觉。

根据 BFC 对其内部元素和外部元素的表现特性，将 BFC 的特性总结为 **对内部元素的包裹性** 及 **对外部元素的独立性**。

### 如何触发

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

### BFC 布局规则

1. 内部的 Box 会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定。**属于同一个 BFC 的两个相邻 Box** 的 margin 会发生重叠。
3. 每个元素的 margin box 的左边，与包含块 border box 的左边相接触（对于从左向右的格式化，否则相反）。即使存在浮动也是如此。
4. BFC 的区域不会与 float box 重叠。
5. BFC 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算 BFC 的高度时，浮动元素参与计算。



## 表格布局的弊端

- 可访问性查，内容从左到右从上到下的读取并不是总有意义，无障碍工具从文档中获取的数据会混乱    
- 难以实现响应式 
- 可维护性差 
- 不够语义化 
- 加载速度慢，嵌套表多 