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

对于 MVVM 来说，其实最重要的并不是通过双向绑定或者其他的方式将 View 与 ViewModel 绑定起来，**而是通过 ViewModel 将视图中的状态和用户的行为分离出一个抽象，这才是 MVVM 的精髓**。

## MVVM和MVC的区别？

MVC也是一种设计思想，主要就是MVC中的Controlled演变成MVVM中的ViewModel。MVVM主要解决了MVC中大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验。和当Model频繁发送变化，开发者需要主动更新到View。

## 数据的双向绑定

![数据双向绑定](https://github.com/YiiChitty/FrontEndLearning/blob/master/img/MVVM_04.webp)

利用`Object.defineProperty()`对数据进行劫持，设置一个监听器`Observer`，用来监听所有属性，如果属性上发生变化了，就需要告诉订阅者`Watcher`去更新数据，最后指令解析器`Compile`解析对应的指令，进而会执行对应的更新函数，从而更新视图，实现双向绑定。

## 虚拟DOM

操作 DOM 是很慢的，原因已经在浏览器渲染部分说过了。相较于 DOM 来说，操作 JS 对象会快很多，并且我们也可以通过 JS 来模拟 DOM

```js
const ul = {
  tag: 'ul',
  props: {
    class: 'list'
  },
  children: {
    tag: 'li',
    children: '1'
  }
}
```

上述代码对应的 DOM 就是

```html
<ul class='list'>
  <li>1</li>
</ul>
```

那么既然 DOM 可以通过 JS 对象来模拟，反之也可以通过 JS 对象来渲染出对应的 DOM。

当然了，通过 JS 来模拟 DOM 并且渲染对应的 DOM 只是第一步，难点在于如何判断新旧两个 JS 对象的**最小差异**并且实现**局部更新** DOM。

首先 DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异，那么需要的时间复杂度会是 O(n ^ 3)，这个复杂度肯定是不能接受的。于是 React 团队优化了算法，实现了 O(n) 的复杂度来对比差异。 实现 O(n) 复杂度的关键就是只对比同层的节点，而不是跨层对比，这也是考虑到在实际业务中很少会去跨层的移动 DOM 元素。 所以判断差异的算法就分为了两步

- 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异
- 一旦节点有子元素，就去判断子元素是否有不同

在第一步算法中，需要判断新旧节点的 `tagName` 是否相同，如果不相同的话就代表节点被替换了。如果没有更改 `tagName` 的话，就需要判断是否有子元素，有的话就进行第二步算法。

在第二步算法中，需要判断原本的列表中是否有节点被移除，在新的列表中需要判断是否有新的节点加入，还需要判断节点是否有移动。

举个例子来说，假设页面中只有一个列表，我们对列表中的元素进行了变更

```js
// 假设这里模拟一个 ul，其中包含了 5 个 li
[1, 2, 3, 4, 5]
// 这里替换上面的 li
[1, 2, 5, 4]
```

从上述例子中，我们一眼就可以看出先前的 `ul` 中的第三个 `li` 被移除了，四五替换了位置。

那么在实际的算法中，我们如何去识别改动的是哪个节点呢？这就引入了 `key` 这个属性。这个属性是用来给每一个节点打标志的，用于判断是否是同一个节点。

当然在判断以上差异的过程中，我们还需要判断节点的属性是否有变化等等。

当我们判断出以上的差异后，就可以把这些差异记录下来。当对比完两棵树以后，就可以通过差异去局部更新 DOM，实现性能的最优化。



**为什么 Virtual DOM 比原生 DOM 快?**

首先这个问题得分场景来说，如果无脑替换所有的 DOM 这种场景来说，Virtual DOM 的局部更新肯定要来的快。但是如果你可以人肉也同样去局部替换 DOM，那么 Virtual DOM 必然没有你直接操作 DOM 来的快，毕竟还有一层 diff 算法的损耗。

当然了 Virtual DOM 提高性能是其中一个优势，其实**最大的优势**还是在于：

1. 将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
2. 同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
3. 实现组件的高度抽象化





## 路由原理

前端路由的本质是**监听 URL 的变化**，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式

- Hash 模式
- History 模式

### Hash 模式

`www.test.com/#/` 就是 Hash URL，当 `#` 后面的哈希值发生变化时，可以通过 `hashchange` 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 `www.test.com`。

```
window.addEventListener('hashchange', () => {
  // ... 具体逻辑
})
```

Hash 模式相对来说更简单，并且兼容性也更好。

### History 模式

History 模式是 HTML5 新推出的功能，主要使用 `history.pushState` 和 `history.replaceState` 改变 URL。

通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。

```javascript
// 新增历史记录
history.pushState(stateObject, title, URL)
// 替换当前历史记录
history.replaceState(stateObject, title, URL)
```

当用户做出浏览器动作时，比如点击后退按钮时会触发 `popState` 事件

```javascript
window.addEventListener('popstate', e => {
  // e.state 就是 pushState(stateObject) 中的 stateObject
  console.log(e.state)
})
```

### 两种模式对比

- Hash 模式只可以更改 `#` 后面的内容，History 模式可以通过 API 设置任意的同源 URL
- History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
- Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 `index.html` 页面用于匹配不到静态资源的时候.