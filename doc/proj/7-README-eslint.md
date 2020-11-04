<!--
 * @Descripttion: eslint 项目中使用情况
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-21 11:24:55
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-02-21 12:41:29
 -->

## eslint


> rule 使用

当前采用vue官方rule lib。在其基础上进行新增or移除。

对于规则，`无需记忆`，按提示自动解决或手动修复

```js
extends:['plugin:vue/recommended', 'eslint:recommended'], 
```

> 问题解决


1. 鼠标移上去点fix
2. CTRL+SHIFT+M 或 查看->问题 会展示当前打开的所有页面的问题

注意: 有些问题点fix即可自动解决，有些问题需手动修复。

`eslint`还提供了我们忽略当前问题的选项，慎用，务滥用，不然全是一堆无用的eslint注释。如下:

```js
// eslint-disable-next-line vue/require-default-prop
params: {//表单参数 
    type: Object
},
```

`params`是一个`prop`，需要有默认值。但打上`eslint-disable`即可忽略掉当前规则检测。但一般情况下，这是不被允许的。


> 常见的rule [0:忽略规则，1:warn，2:error] (以下展示1跟2)

`warn级别`

1. vue/attributes-order 1

    Attribute "size" should go before "@click".eslint(vue/attributes-order)

    vDom属性值设置的顺序有要求

2. vue/order-in-components

    The "data" property should be above the "watch" property on line 67.eslint(vue/order-in-components)

    vue 属性(如data watch )的顺序有要求

2. vue/require-default-prop 1

    Prop 'params' requires default value to be set.eslint(vue/require-default-prop)

    props需要有默认值

3. vue/html-indent
    
    Expected indentation of 4 spaces but found 5 spaces.eslint(vue/html-indent)

    缩进的要求(右键，格式化文档能解决大部分缩进问题)

4. vue/mustache-interpolation-spacing

    Expected 1 space after '{{', but not found.eslint(vue/mustache-interpolation-spacing)

    缩进的要求，{{前 }}后需有一个空格

5. vue/name-property-casing

    Property name "dialogEditForm" is not PascalCase.eslint(vue/name-property-casing)

    组件的name属性需大写开头

6. vue/html-quotes

    Expected to be enclosed by double quotes.eslint(vue/html-quotes)

    能用双引号的不要用单引号

`error级别`

1. vue/no-unused-components 2

    The "Pagination" component has been registered but not used.eslint(vue/no-unused-components)
    
    未使用的组件引用

2. no-unused-vars

    'formatTime' is defined but never used.eslint(no-unused-vars)

    未使用的对象引用(方法参数除外)

2. no-unreachable

    Unreachable code.eslint(no-unreachable)

    无效的代码段，如return;后的代码

3. no-console

    Unexpected console statement.eslint(no-console)

    大部分情况下提交的代码中不要有console.log

4. no-debugger

    Unexpected 'debugger' statement.eslint(no-debugger)

    所有情况下提交的代码中不要有debugger










