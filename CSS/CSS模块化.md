## CSS 模块化

### vue中style标签中设置scoped的原理

这个局部样式是通过PostCSS给组件中所有的DOM添加了一个独一无二的动态属性，然后通过CSS属性选择器来选择组件中的DOM

### CSS预处理

#### 优点

- 用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件，以便项目使用。
- CSS更加简洁、适应性更强，更易于代码的维护

#### 基本语法

Less的基本语法和CSS差不多，SASS和Stylus都可以利用缩进代替花括号，并且空格有重要的意义。

```css
- less&scss;
ul{
    list-style:none;
}
-sass
ul
	list-style:none
- stylus:
ul
	list-style none
```

#### 变量

```css
-less&scss;
@orange:#feb914;
header{
    background-color:@orange;
}
- sass
$orange:#feb914;
header
	background-color:$orange;
- stylus
bgorange=#feb914;
header
	background-color bgorange
```

#### 变量作用域

```css
- less: less中素有变量的计算，都是以这个变量最后一次被定义的值为准，这个行为叫懒加载

@size:40px;
.content{
    width:@size;
}
@size:60px;
.container{
    width:@size;
}

=>编译输出
.content{
    width:60px;
}
.container{
    width:60px;
}

-sass stylus
$size:40px;
.content{
    width:$size;
}
$size:60px;
.container{
    width:$size;
}
=>编译输出
.content{
    width:40px;
}
.container{
    width:60px;
}
```

#### 总结

- sass和lessy语法严谨，Stylus相对自由，因为Less更像原生的CSS，所以可能学起来更加容易
- sass和compass、stylus和nib都是好朋友
- sass和stylus都具有类语言的逻辑方式处理：条件、循环等；less需要通过when等关键词模拟这些功能，这方面less比不上sass和stylus
- less在丰富性及特色上都不及sass和stylus，如果不是bootstrap引入了less，可能不会这样被广泛应用。