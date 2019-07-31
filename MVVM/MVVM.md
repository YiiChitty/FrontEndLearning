## MVC

![MVC](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/MVVM_01.png)

M（Model）：数据保存

V（View）：用户页面

C（Controller）：业务逻辑

所有通信都是单向的。

1. View传指令到Controller。
2. Controller完成业务逻辑后，要求Model改变状态。
3. Model将新的数据发送到View，用户得到反馈。

## MVP

![MVP](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/MVVM_02.png)

M（Model）是业务逻辑层，主要负责数据，网络请求等操作

V（View）是视图层，负责绘制UI元素、与用户进行交互

P（Presenter）是View与Model交互的中间纽带，处理与用户交互的逻辑

MVP模式将Controller改名为Presenter，同时改变了通信方向。

1. 各部分之间的通信，都是双向的。
2. View与Model不发生联系，都通过Presenter传递。
3. View非常薄，不部署任何业务逻辑，称为“被动视图”，即没有任何主动性，而Presenter非常厚，所有业务逻辑都部署在那里。

## MVVM

![MVVM](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/MVVM_03.png)

MVVM是`Model-View-ViewModel`的缩写。MVVM是一种设计思想。Model层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View代表UI组件，它负责将数据模型转换成UI展现出来，ViewModel是一个同步View和Model的对象。

在MVVM架构下，View和Model之间并没有直接的联系，而是通过ViewModel进行交互，Model和ViewModel之间的交互是双向的，因此View数据的变化会同步到Model中，而Model数据的变化也会立即反应到View上。

ViewModel通过**双向数据绑定**把View层和Model层连接了起来，而View和Model之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全由MVVM来统一管理。

## MVVM和MVC的区别？

MVC也是一种设计思想，主要就是MVC中的Controlled演变成MVVM中的ViewModel。MVVM主要解决了MVC中大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验。和当Model频繁发送变化，开发者需要主动更新到View。

## 数据的双向绑定

![数据双向绑定](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/MVVM_04.png)

利用`Object.defineProperty()`对数据进行劫持，设置一个监听器`Observer`，用来监听所有属性，如果属性上发生变化了，就需要告诉订阅者`Watcher`去更新数据，最后指令解析器`Compile`解析对应的指令，进而会执行对应的更新函数，从而更新视图，实现双向绑定。

