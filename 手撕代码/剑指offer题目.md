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

```javascript

```

