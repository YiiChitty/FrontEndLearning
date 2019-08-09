# 剑指offer题目

## 字符串类

### 1.正则表达式匹配

请实现一个函数用来匹配包括'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配

```javascript
function match(s, pattern)
{
    //正常模式:完全匹配
    //.模式：跳过一位匹配即可
    //* 比较复杂，可能0个，可能很多个
    //考虑每次匹配完，就把前面的丢掉，继续递归看后面的满不满足条件
    let isMatch=(s,p)=>{
        //边界是字符串和正则都为空
        if(p.length<=0){
            return !s.length;
        }
        //开始判断当前第一个字符是不是匹配的
        let match=false;
        if(s.length>0&&(s[0]===p[0]||p[0]==='.')){
            match=true;
        }
        //处理有*的情况
        if(p.length>1&&p[1]==='*'){
            //匹配0个，或者丢弃一个继续匹配   sssa s*a 丢掉一个s 匹配ssa s*a
            return isMatch(s,p.slice(2))||(match&&isMatch(s.slice(1),p));
        }else{
            //正常匹配
           return  match&&isMatch(s.slice(1),p.slice(1));
        }
    }
    return isMatch(s,pattern);
}
```

### 2.替换空格

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

```javascript
//正则表达
function replaceSpace(str){
    return str.replace(new RegExp(/\s/g),'%20');
}
```

### 3.表示数值的字符串

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。



## 数组

### 1.数组中重复的数字

在一个长度为n的数组里的所有数字都在0到n-1的范围内。 数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是第一个重复的数字2。

```js
function duplicate(numbers, duplication)
{
    // write code here
    //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    //函数返回True/False
    if(numbers===null&&numbers<0){return false;}
    for(let i=0,tmp;i<numbers.length;i++){
        if(numbers[i]<0&&numbers[i]>length-1) return false;
        //不等于就交换
        let temp=undefined;//临时变量保存交换结果
        while(numbers[i]!==i){
            //找到第一个就返回
            if(numbers[i]===numbers[numbers[i]]){
                duplication[0]=numbers[i];
                return true;
            }
            temp=numbers[i];
            numbers[i]=numbers[temp];
            numbers[temp]=temp;
        }
    }
    return false;
}
```

#### 延伸题 不修改数组找出重复的数字

在一个长度为n+1的数组里，,所有数字都在1-n的范围中，所以数组中至少有一个数是重复的。 请找出数组中任意一个重复的数字，但不可以修改这个数组。 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是2或者3。

思路一就是申请一个新的数组，先复制，然后和上面那道题一样。

但如果要避免使用O(n)的辅助空间，那就可以借鉴二分查找的思路。从1-n的数字从中间数字m分为两个部分，如果1-m部分数字数目超过m，那么这一半的区间里一半为m+1~n。如果1~m的数字的数目超过m，那么这一半的区间里一定包含重复数字。

{2,3,5,4,3,2,6,7}，数字在1-7的范围内，从中间3开始，1-3 和4-7；统计1-3这3个数字在在数组中出现的次数。一共出现了4次，那么一定有重复的。接着再1-3分为1-2和3-3，统计1-2在数组中出现的次数，有2次；统计3-3在数组中出现的次数，有2次，那么3重复了。

```js
//输入一个数组，数字的范围
function duplicate(arr,nums){
    if(arr==null&&nums<=0)return -1;
    let start=1,end=nums;
    while(end>=start){
        let middle=Math.ceil((end-start)/2)+start;
        let count=countnum(arr,nums,start,middle);
        if(end ===start){
           if(count>1) return start;
        }
        if(count>middle-start+1){
            end=middle;
        }else{
            start=middle+1;
        }
    }
    return -1;
}
//计算区间内数字出现的个数
function countnum(arr,nums,start,end){
    if(nums==null) return 0;
    let counts=0;
    for(let i=0;i<nums;i++){
        if(nums[i]>=start&&nums[i]<=end){
            counts++;
        }
    }
    return counts;
}
```

### 2.二维数组中的查找

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```js
//暴力
function Find(target, array)
{
    let result=false;
    let len=array.length;
    for(let i=0;i<len;i++){
        for(let j=0;j<array[i].length;j++){
            if (array[i][j]===target){
                result=true;
            }
        }
    }
    return result;
}
```

这道题说了，每一行都是从左到右递增的顺序，每一列都是从上到下的递增的顺序，所以完全可以利用这一点进行。比如从二维矩阵的右上角开始，目标比它小，只需要在它右边查找，目标比它大，那直接向下查找即可。

当target小于元素`a[row][col]`时，那么target必定在元素a所在行的左边,即col--；当target大于元素`a[row][col]`时，那么target必定在元素a所在列的下边,即row++；

```js
function Find(target,array){
    //右上角a[0][col]
    let row=0,col=array[0].length-1;
    while(row<array.length&&col>=0){
        if (target==array[row][col]){
            return true;
        }
        if(target<array[row][col]){
            col--;
        }else{
            row++;
        }
    }
    return false;
}
```

## 链表

### 1.从尾到头打印链表

输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。<br/>

剑指Offer书上的题解是：从尾到头输出可以想象是一个递归的过程，每次都先输出后面一个节点的值。

不过用js不用这么麻烦，正常遍历，每次都从数组头部插入，这样结果就是逆序的了。

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    let result=[];
    while(head){
        result.unshift(head.val);
        head=head.next;
    }
    return result;
}

```

## 树

### 1.重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

思路：

先序遍历的第一个节点就是它的根节点，通过这个根节点，可以在中序遍历中找到它的位置，它之前的就是左子树，后面就是右子树。通过左子树的数目可以在先序遍历结果中找到左子树，后面就是右子树。

可以通过递归的办法得出最后的结果。

```js
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin)
{
    let node=null;
    if(pre.length>1){
        let head=pre[0];
        let vinheadindex=vin.indexOf(head);
        let vinleft=vin.slice(0,vinheadindex);
        let vinright=vin.slice(vinheadindex+1);
        pre.shift();//头节点丢掉
        let preleft=pre.slice(0,vinleft.length);
        let preright=pre.slice(vinleft.length);
        node={
            val:head,
            left:reConstructBinaryTree(preleft,vinleft),
            right:reConstructBinaryTree(preright,vinright)
        }
    }else if (pre.length===1){
        node={
            val:pre[0],
            left:null,
            right:null
            }
    }
    return node;
}
```

### 2.二叉树的下一个节点

给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。

思路：

如果这个节点有右子树，那么下一个节点就是右子树的最左子节点。

如果节点没有右子树：

节点是父节点的左子节点，那下一个节点是父节点。

节点是父节点的右子节点，那就向上找到一个是它父节点的左子节点的节点，如果节点存在，这个节点的父节点就是下一个节点。

```js
/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode)
{
    // write code here
    if(!pNode) return null;
    let p;
    //存在右子树
    if(pNode.right){
        p=pNode.right;
        while(p.left){
            p=p.left;
        }
    }else{
        //父节点
        p=pNode.next;
        if(p&&p.right==pNode){
            //是父节点的右节点，向上查一个父亲节点的左节点
             while(p.next && p.next.right == p){
                p = p.next;
            }
            if(p.next == null){
                p =  null;
            }else{
                p = p.next;
            }
        }
    }
    return p;
}
```

## 栈和队列

### 1.用两个栈实现队列

用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

思路：

先依次把 a,b,c 插stack1中，如果要弹出a,把c,b压入stack2中，弹出a，此时stack1为空，再从stack2弹出b……依此类推。如果在中途插入新的元素，那么必须等stack2全部为空之后再进行操作。

```js
let stack1=[],
    stack2=[];
function push(node)
{
    stack1.push(node);
}
function pop()
{
    if(stack2.length==0){
        //stack2为空，说明全部在stack1中，需要从那边压过来
        if(stack1.length==0){
            return null;
        }else{
            //依次压入
            let len =stack1.length;
            for(let i=0;i<len;i++){
                stack2.push(stack1.pop());
            }
            return stack2.pop();
        }
    }else{
        //stack2不为空直接弹
        return stack2.pop();
    }
}
```

## 递归

