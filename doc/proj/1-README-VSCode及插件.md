 * @Descripttion: common vs setting 
 * @version: 1.0
 * @Author: wenchao.chai
 * @LastEditors: wenchao.chai
 * @Date: 2019-04-04 15:46:23
 * @LastEditTime: 2019-04-04 16:02:48 

how to config your VS Code ?

> 1 install plugin `Settings Sync`
  
> 2  ctrl+p + Sync download setting

> 3 input token & gist 

`GitHub Token: 9f61ae492bfae4584f6646e46650e06ce4764918`

`GitHub Gist: b9e3f106061a249d4edafdd34b9ef9d2`

> 4 文件->首选项->设置->扩展->file header configuration->在setting.json中编辑

```json
  // 签名修改
  "fileheader.customMade": {
      "Descripttion":"",
      "version":"",
      "Author":"wenchao.chai",
      "Date":"Do not edit",
      "LastEditors":"wenchao.chai",
      "LastEditTime":"Do not Edit"
  }
```

> 5 若vscode导致cpu 100%

`search.followSymlinks`:false

文件--首选项--设置--搜索栏输入followSymlinks

> 6 that's all !!!

> tip:ctrl+p(quick open)

> plugin for vscode

1. `KoroFileHeader`   
   desc: quick doc for file and finction.   
   setting: ctrl+p input 'setting', add content as follow:            
```js
  //文件头部注释
  "fileheader.customMade": {
      "Descripttion":"",
      "version":"",
      "Author":"your name like wenchao.chai",
      "Date":"Do not edit",
      "LastEditors":"your name like wenchao.chai",
      "LastEditTime":"Do not Edit"
  },
  //函数注释 
  "fileheader.cursorMode": {
        "name":"",  
        "param":"",
        "return":"",
        "other":""
  },
```
    demo:  

    ```js
    for function
    /**
     * @name: 保存callback 
     * @param {type} 
     * @return: 
     * @other: 
     */     

     for file
     /*
      * @Descripttion: desc of project
      * @version:  wenchao.chai in hengtai
      * @Author: wenchao.chai
      * @LastEditors: wenchao.chai
      * @Date: 2019-04-02 13:54:16
      * @LastEditTime: 2019-04-04 16:32:25
      */ 
    ```
* how to use:   
    + file header doc:     `crtl+alt+i` (window), `ctrl+cmd+t` (mac)  
    + function header doc: `ctrl+alt+t` (window), `ctrl+alt+t` (mac)  

2. `Better Comments`     
    desc: Comments helper with '!?..' & color.  
    setting: null  
    how to use: null  
    demo:  
    ```js
    /**
     * @name: 保存callback 
     * @param {type} 
     * @return: 
     * @other: 
     * * remark somthing
     * ! something you warn user not todo 
     * ? something you doubt
     * todo something havent done
     */    

    简单版本
     /**
      * @name: simple comment
      */  
    其他形式 按需组合
    ``` 
3. `Remove Comments`  
    it is useful when u copy one file to another place for initial.

    ctrl+p:>remove comment  
    setting:  
    ```js
     //函数注释的特殊字符颜色注册
    "better-comments.tags": [
        {
          "tag": "!",
          "color": "#FF2D00",
          "strikethrough": false,
          "backgroundColor": "transparent"
        },
        {
          "tag": "?",
          "color": "#3498DB",
          "strikethrough": false,
          "backgroundColor": "transparent"
        },
        {
          "tag": "//",
          "color": "#474747",
          "strikethrough": true,
          "backgroundColor": "transparent"
        },
        {
          "tag": "todo",
          "color": "#FF8C00",
          "strikethrough": false,
          "backgroundColor": "transparent"
        },
        {
          "tag": "*",
          "color": "#98C379",
          "strikethrough": false,
          "backgroundColor": "transparent"
        }
      ]
    ``` 
    单行代码的注释，尽量放在code 末尾，不要放在code的上方，影响代码流畅度与可读性  
    ```js
    //X： this is not correct 
    let a = ""

    let a = "" // √：this is correct
    ```

一般方法注释以下几种，看情况自由选择

```js
/**
 * @name: 
 * @param {type} 
 * @return: 
 * @other: 
 */

/**
 * @name:  
 */ 

 /**
 * @name:  
 * @other: 
 */ 

 /**
 * @name: 
 * @param {type} 
 * @return: 
 * @other:  
 * * remark somthing
 * ! something you warn user not todo 
 * ? something you doubt
 * todo something havent done
 */
 
```
 
4. `Vue 2 Snippets` & `vetur` 
    desc: code helper for Vue2.  
    setting: null  
    how to use: null

5. `格式化`  

```js
//格式化时，不自动换行
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatter.js": "vscode-typ=script",
"vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
        "wrap_attributes": "auto"
    },
    "prettyhtml": {
        "printWidth": 100,
        "singleQuote": false,
        "wrapAttributes": false,
        "sortAttributes": false
    }
}
```

6. `Vue Peek`

可用于查找变量引用，快速定位组件等等

7· 注意有时候插件不起作用，先看右下角 文件类型是否一致 有可能为html，改为vue即可


