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

### 1.斐波拉契数列

大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。

n<=39

```js
//递归方法
function Fibonacci(n){
    if(n<=0) return 0;
    if(n===1) return 1;
    return Fibonacci(n-1)+Fibonacci(n-2);
}
```

这样做的话效率很低，其实做的过程中的中间数都是重复的，把中间值保存一下，需要计算的时候查找，就能解决这个问题。

```js
function Fibonacci(n){
    let res=[0,1];
    if(n<=1){return res[n];}
    let n1=0,n2=1;
    let tmp;
    for(let i=2;i<=n;i++){
        tmp=n1+n2;
        n1=n2;
        n2=tmp;
    }
    return tmp;
}
```

#### 变种题 青蛙跳台阶

一只青蛙一次可以跳1级台阶或者2级台阶，求问该青蛙跳上一个n级台阶有多少种跳法。

其实就是斐波拉契数列，因为n级台阶的跳法看成是n的函数，f(n)。那么有两种跳法，一种只跳1级，即f(n-1);一种跳两级，即f(n-2)。那么f(n)=f(n-1)+f(n-2)。

```js
function jumpFloor(number)
{
    let result=[0,1,2];
    if(number<=2){return result[number];}
    let res;
    let n1=1,n2=2;
    for(let i=3;i<=number;i++){
        res=n1+n2;
        n1=n2;
        n2=res;
    }
    return res;
}
```

#### 拓展

一只青蛙可以跳1级、2级……n级。此时青蛙跳上一个n级的台阶有多少种跳法。

数学归纳法是f(n)=2^(n-1)

```js
function jumpFloorII(number)
{
    return Math.pow(2,number-1);
}
```

不过,用位运算更快

```js
function jumpFloorII(number)
{
    return 1<<(--number);
}
```

#### 变种题2 覆盖矩形

可以用`2*1`的小矩形横着或者竖着去覆盖大矩形。请问用8个`2*1`的小矩形无重叠覆盖一个`2*8`的大矩阵总共有多少种方法？

先把`2*8`的覆盖方法记为f(8)，用第一个覆盖时，可以横着或者竖着。竖着放的时候，还剩下`2*7`的矩形，记为f(7)。横着放的时候，另一个也只能横着放，还剩下`2*6`的矩形，记为f(6)。所以还是斐波那契数列。

```js
function rectCover(number)
{
    let res=[0,1,2];
    if(number<=2){return res[number];}
    let tmp,n1=1,n2=2;
    for(let i=3;i<=number;i++){
        tmp=n1+n2;
        n1=n2;
        n2=tmp;
    }
    return tmp;
}
```

## 查找排序

> 如果面试题是要求在排序数组或者部分排序数组中找一个数字或者统计某个数字的出现次数，都可以用二分查找。

### 1.旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

思路：

暴力破解其实也挺快的，但是算法复杂度为O(n)。这样肯定不够优雅。

优雅的解题思路是，把旋转之后的数组看做是两个排序的子数组，而且前面子数组的元素都大于或者等于后面子数组的元素。最小的元素就是这两个子数组的分界线。

可以用两个指针首尾二分法查找，以上面的数组为例，开始指针指向3,2。二分法中间为5,大于3,它一定位于递增数列第一个子数组。把头部指针指向5。此时位于中间的1，小于2，位于递增数组第二个子数组，尾指针指向1。此时指针差为1，输出尾指针的元素即可。

特殊情况是当中间三个数的数值都一样的时候，那只能遍历输出了。

```js
function minNumberInRotateArray(rotateArray)
{
    let start=0,end=rotateArray.length-1;//记录下标
    let middle=0;
    while(rotateArray[start]>=rotateArray[end]){
        if(end-start==1){
            middle=end;
            break;
        }
        middle=Math.floor((end+start)/2);
        if(rotateArray[middle]>=rotateArray[start]){
            start=middle;
        }else if(rotateArray[middle]<=rotateArray[end]){
            end=middle;
        }
        //如果下标start end middle的值一样，那只能顺序查找了
        if(rotateArray[start]===rotateArray[middle]&&rotateArray[start]===rotateArray[end]){
            let res=rotateArray[start];
            for(let i=start+1;i<=end;i++){
                if(res>rotateArray[i]){
                    res=rotateArray[i];
                }
            }
            return res;
        }
    }
    return rotateArray[middle];
}
```

常规算法思路是上面这样，但在js中可以利用数组的API来计算……但这样就没啥意思了不是么。

```js
function minNumberInRotateArray(rotateArray)
{
   return Math.min(...rotateArray);
}
```

## 回溯法

### 1.矩阵中的路径

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。 例如 a b c e s f c s a d e e 这样的3 X 4 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。

思路：

首先，在矩阵中任选一个格子作为路径的起点。如果路径上的第i个字符不是ch，那么这个格子不可能处在路径上的第i个位置。如果路径上的第i个字符正好是ch，那么往相邻的格子寻找路径上的第i+1个字符。除在矩阵边界上的格子之外，其他格子都有4个相邻的格子。

重复这个过程直到路径上的所有字符都在矩阵中找到相应的位置。由于回朔法的递归特性，路径可以被开成一个栈。当在矩阵中定位了路径中前n个字符的位置之后，在与第n个字符对应的格子的周围都没有找到第n+1个字符，这个时候只要在路径上回到第n-1个字符，重新定位第n个字符。

由于路径不能重复进入矩阵的格子，还需要定义和字符矩阵大小一样的布尔值矩阵，用来标识路径是否已经进入每个格子。 当矩阵中坐标为（row,col）的
格子和路径字符串中相应的字符一样时，从4个相邻的格子(row,col-1),(row-1,col),(row,col+1)以及(row+1,col)中去定位路径字符串中下一个字符。如果4个相邻的格子都没有匹配字符串中下一个的字符，表明当前路径字符串中字符在矩阵中的定位不正确，我们需要回到前一个，然后重新定位。
　　一直重复这个过程，直到路径字符串上所有字符都在矩阵中找到合适的位置。

```js
function hasPath(matrix, rows, cols, path)
{
    if(path.length===0) return true;
    if(rows*cols< path.length) return false;
    
    let status=[];
    for(let i=0;i<rows;i++){
        status.push([]);
        for(let j=0;j<cols;j++){
            status[i][j]=false;
        }
    }
    //找到第一个符合的path
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(matrix[i*cols+j]===path[0]){
                if(path.length===1){
                    return true;
                }
                status[i][j]=true;
                if(find(matrix,rows,cols,i,j,path.slice(1),status)){
                    return true;
                }
                status[i][j]=false;
            }
        }
    }
    return false;
}

function find(matrix,rows,cols,row,col,path,status){
    if(row>0 && matrix[(row-1)*cols+col]===path[0]&&status[row-1][col]===false){
        if(path.length===1){
            return true;
        }
        status[row-1][col]=true;
        if(find(matrix,rows,cols,row-1,col,path.slice(1),status)){
            return true;
        }
        status[row-1][col]=false;
    }
    if(row<rows-1&&matrix[(row+1)*cols+col]===path[0]&&status[row+1][col]===false){
        if(path.length===1){
            return true;
        }
        status[row+1][col]=true;
        if(find(matrix,rows,cols,row+1,col,path.slice(1),status)){
            return true;
        }
        status[row+1][col]=false;
    }
    if(col>0&&matrix[row*cols+col-1]===path[0]&&status[row][col-1]===false){
        if(path.length==1){
            return true;
        }
        status[row][col-1]=true;
        if(find(matrix,rows,cols,row,col-1,path.slice(1),status)){
            return true;
        }
        status[row][col-1]=false;
    }
    if(col<cols-1&&matrix[row*cols+col+1]===path[0]&&status[row][col+1]===false){
        if(path.length===1){
            return true;
        }
        status[row][col+1]=true;
        if(find(matrix,rows,cols,row,col+1,path.slice(1),status)){
            return true;
        }
        status[row][col+1]=false;
    }
    return false;
}
```

### 2.机器人的运动范围

地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？

从0,0开始移动，当它准备进入坐标为(i,j)的格子时，通过检查坐标的数位和来判断机器人能否进入，如果可以进入，再判断它是否能进入上下左右的四个格子。

```js
function movingCount(threshold, rows, cols)
{
    // write code here
    var flag = [];
    for(var i=0;i<rows;i++){
        flag.push([]);
        for(var j =0;j<cols;j++){
            flag[i][j] = 0;
        }
    }
    return count(0,0,rows,cols,threshold,flag);
}
function count(i,j,rows,cols,threshold,flag){
    if(i<0||j<0||i>=rows||j>=cols||flag[i][j]||sumNum(i)+sumNum(j)>threshold){
        return 0;
    }
    flag[i][j] = 1;
    return count(i+1,j,rows,cols,threshold,flag)
    +count(i-1,j,rows,cols,threshold,flag)
    +count(i,j+1,rows,cols,threshold,flag)
    +count(i,j-1,rows,cols,threshold,flag)+1;
}
function sumNum(num){
    var sum =0;
    do{
        sum+=num%10;
    }while((num = Math.floor(num/10))>0);
    return sum;
}

```

## 动态规划与贪心

### 1.剪绳子

有一根长度为n的绳子，把绳子剪成m段（m、n都是整数，n>1且m>1），每段绳子的长度记为k[0],k[1]……k[m]。请问他们长度的乘积最大是多少？例如，绳子长度是8的时候，把它剪成长度分别为2、3、3的三段，此时最大乘积是18。



动态规划思路：在剪第一刀的时候，有n-1种可能的选择(1,2,3,…n-1)，因而f(n)=max(f(i)*f(n-i)) (0<i<n)。

先得到f(2) f(3) 再从它们得到f(4)……f(n)

```js
function maxProductAfterCutting(length){
    if(length<2) return 0;
    if(length==2)return 1;
    if(length==3)return 2;
    
    let product=[0,1,2,3];
   
    for(let i=4,max;i<=length;i++){
        max=0;
        for(let j=1;j<=i/2;j++){
            let temp=product[j]*product[i-j];
            if(max<temp){
                max=temp;
            }
            product[i]=max;
        }
    }
    return product[length];
    
}
```

贪心思路：

如果按照这个策略来剪绳子：

当n大于等于5时，尽可能多的剪长度为3的绳子；剩下的长度为4时，把绳子剪成两段长度为2的绳子。

```js
function maxProductAfterCutting(length){
    if(length<2) return 0;
    if(length==2)return 1;
    if(length==3)return 2;
    
    //尽可能多剪3
    let timesofthree=length/3;
    
    //绳子剩下的长度为4时，剪成2*2
    if(length-timesofthree*3==1){
        timesofthree-=1;
    }
    
    let timesoftwo=(length-timesofthree*3)/2;
    return Math.pow(3,timesofthree)*Math.pow(2,timesoftwo);
}
```

## 位运算

### 二进制中1的个数

输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

思路：如果最后一位是1，那么减去1，最后一位变成0，其他不变；如果最后一位是0，减去1之后，最右边的1会变成0，后面一位变成1。

把一个整数减去1然后与它做与运算，就能把整数最右边的1变成0，这样的话，有多少个1就可以进行多少次操作。

```js
function NumberOf1(n){
    let count=0;
    while (n){
        ++count;
        n=(n-1)&n
    }
    return count;
}
```



## 高质量代码

### 1.数值的n次方

给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。

**思路：**假设指数为32，如果有16次方，只需要再平方一次就好；16次方是8次方的平方；8次方是4次方的平方……所以对偶数而言就是 a的二分之n方相乘；对奇数而言就是 a的二分之n-1方相乘再乘以a，于是可以用递归。

不过好像没有考虑到幂次是负数的情况，不过也不要紧：分开处理一下就好了。

```js
function Power(base, exponent){
	let result=power(base,Math.abs(exponent));
	function power(base,exponent){
		if(exponent===0){return 1;}
		if(exponent===1){return base;}
    
		let result=Power(base,exponent>>1);
		result *=result;
		if(exponent& 0x1===1){
			//奇数再乘以a
			result *=base;
		}
		return result
	}
	return exponent>=0? result:1/result;
}
```

