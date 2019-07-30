# Felx

提供一些参考文章：

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 

[A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)

[阮一峰Flex布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

以下内容是对上面的笔记方便记忆：

## 什么是 Flex ？

Flex 是 Flexible Box 的缩写，意为“弹性布局”，用来为盒状模型提供最的灵活性。

**任何一个容器都可以指定为 Flex 布局**。

注意：**设置为 Flex 布局后，子元素的 float 、clear 和 vertical-align 属性将失效。**

## 1、基本概念

采用 Flex 布局的元素，称为 **Flex 容器**（Flex Container），简称“容器”。它的所有子元素自动成为容器成员，称为 **Flex 项目**（Flex Item），简称“项目”。

[![img](https://camo.githubusercontent.com/4a62f4e4c2c48901fe2e18f0937f52a0f872dedb/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030342e706e67)](https://camo.githubusercontent.com/4a62f4e4c2c48901fe2e18f0937f52a0f872dedb/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030342e706e67)

容器默认存在两根轴：

- `水平的主轴（main axis）`：主轴开始位置叫做 `main start`，结束位置叫做 `main end`
- `垂直的交叉轴（cross axis）`：交叉轴开始位置叫做 `cross start`，结束位置叫做 `cross end`

项目默认沿主轴排列。单个项目占据的主轴空间叫做 `main size`，占据的交叉轴空间叫 `cross size`

## 2、容器的属性

有以下 6 种：

- `flex-direction`
- `flex-wrap`
- `flex-flow`
- `justify-content`
- `align-items`
- `align-content`

### `flex-direction`

**flex-direction 属性决定主轴的方向（即项目排列的方向）。**

它可能有 4 个值：

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

[![img](https://camo.githubusercontent.com/bb8b00a8353d931a32a422edc2f8b525cc510f1a/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030352e706e67)](https://camo.githubusercontent.com/bb8b00a8353d931a32a422edc2f8b525cc510f1a/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030352e706e67)

### `flex-wrap`

**flex-wrap 属性定义，如果一条轴线排不下，如何换行。**

- `nowrap`（默认值）：不换行。 [![img](https://camo.githubusercontent.com/1cbaf6a9d67c91e0d7e4cb23af07a5a1e373eb52/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030372e706e67)](https://camo.githubusercontent.com/1cbaf6a9d67c91e0d7e4cb23af07a5a1e373eb52/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030372e706e67)
- `wrap`：换行，第一行在上方。 [![img](https://camo.githubusercontent.com/50a1c2251a33ecccc8dd708e1067f5f9e5d9221d/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030382e6a7067)](https://camo.githubusercontent.com/50a1c2251a33ecccc8dd708e1067f5f9e5d9221d/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030382e6a7067)
- `wrap-reverse`：换行，第一行在下方。 [![img](https://camo.githubusercontent.com/c2406b1a4ed44723e9ad223a82b2012131e7f26a/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030392e6a7067)](https://camo.githubusercontent.com/c2406b1a4ed44723e9ad223a82b2012131e7f26a/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313030392e6a7067)

### `flex-flow`

**flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值是 row nowrap**。

### `justify-content`

**justify-content 属性定义了 项目 在 主轴 上的对齐方式**。

它可能有 5 个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

- `flex-start`（默认值）：左对齐。
- `flex-end`：右对齐。
- `center`：居中。
- `space-between`：两端对齐，项目之间的间隔要相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

[![img](https://camo.githubusercontent.com/87d2aa8c9fca63bc1c5fc380826ff5fc39f2e791/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031302e706e67)](https://camo.githubusercontent.com/87d2aa8c9fca63bc1c5fc380826ff5fc39f2e791/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031302e706e67)

### `align-items`

**align-items 属性定义了 项目 在 交叉轴 上的对齐方式**。

它可能有 5 个值，具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `baseline`：项目的第一行文字的基线对齐。
- `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

[![img](https://camo.githubusercontent.com/c392addaa2ccda4d0630cd749e60602236628c1d/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031312e706e67)](https://camo.githubusercontent.com/c392addaa2ccda4d0630cd749e60602236628c1d/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031312e706e67)

### `align-content`

**align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用**。

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。

[![img](https://camo.githubusercontent.com/28fc09d0c51c347805ed3d4e8b537c68cd0da4f3/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031322e706e67)](https://camo.githubusercontent.com/28fc09d0c51c347805ed3d4e8b537c68cd0da4f3/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031322e706e67)

## 3、项目的属性

有以下 6 种：

- `order`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`
- `align-self`

### `order`

**order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。**

[![img](https://camo.githubusercontent.com/7db3f23ff9754b52512c64a932bd0ed0930dd6c0/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031332e706e67)](https://camo.githubusercontent.com/7db3f23ff9754b52512c64a932bd0ed0930dd6c0/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031332e706e67)

### `flex-grow`

**flex-grow 属性定义项目的 放大 比例。默认为 0，即如果存在剩余空间，也不放大。**

[![img](https://camo.githubusercontent.com/5c63ac877d7bb5f8d6e9b6752ad0cd157fd00ab5/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031342e706e67)](https://camo.githubusercontent.com/5c63ac877d7bb5f8d6e9b6752ad0cd157fd00ab5/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031342e706e67)

如果所有项目的 `flex-grow` 属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow` 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

### `flex-shrink`

**flex-shrink 属性定义了项目的 缩小 比例。默认为 1，即如果空间不足，该项目将缩小。**

[![img](https://camo.githubusercontent.com/1b8b5084cf53b4cf0f7a341fe645a89c21ba20c4/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031352e6a7067)](https://camo.githubusercontent.com/1b8b5084cf53b4cf0f7a341fe645a89c21ba20c4/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031352e6a7067)

如果所有项目的 `flex-shrink` 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

负值对该属性无效。

### `flex-basis`

**flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。**

它可以设为跟 `width` 或 `height` 属性一样的值（比如 350px ），则项目将占据固定空间。

### `flex`

**flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为0 1 auto。后两个属性可选。**

该属性有两个快捷值：`auto` (`1 1 auto`) 和 `none` (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### `align-self`

**align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。**

[![img](https://camo.githubusercontent.com/7ddd3d434df1aaa8fd86f22e3f066c4ec3801656/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031362e706e67)](https://camo.githubusercontent.com/7ddd3d434df1aaa8fd86f22e3f066c4ec3801656/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353037313031362e706e67)

该属性可能取6个值，除了`auto`，其他都与 `align-items` 属性完全一致。