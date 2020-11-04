
> 控件相关

1. 文本域

字数限制 默认 maxlength="250" show-word-limit

```js
<el-input v-model="dataBind.reason" class="form-input-item" type="textarea" maxlength="250" show-word-limit/>
```

 
2. TableHeader

简单页面无需添加title及icon，tagview及面包屑导航中已能反映相关信息，反而占空间。

> 4. eslint

打造团队自己的rule lib.

> 5. axios

已封装了请求的reqeust，除了基本的功能外，axios还可以执行多个并发请求，拦截器什么的。
 

 
> 7. router-view

![routerView](https://user-gold-cdn.xitu.io/2017/5/3/ed2de15673673276b00e205c042048e4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
 
创建和编辑的页面使用的是同一个component,默认情况下当这两个页面切换时并不会触发vue的created或者mounted钩子.

可以简单的在 router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子了。这样简单的多了。  

不过我们现在用的是dialog组件控制visible切换新增编辑。无关路由

```c#
<router-view :key='key'></router-view>

  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 } 
```


> 11 table

[component-table](http://element-cn.eleme.io/#/zh-CN/component/table)

filters: 可以理解为formatter.参考@views/user/userList

show-overflow-tooltip: 简单的列超出时tooltip，默认true。
```js
  <el-table-column label="邮件地址" width="150px" align="center" show-overflow-tooltip>
    <template slot-scope="scope">
      <span>{{ scope.row.emEmail }}</span>
    </template>
  </el-table-column> 
```

el-popover: 自定义列的tooltip
```js 
  <el-popover trigger="hover" placement="top">
    <p>姓名: {{ scope.row.name }}</p>
    <p>住址: {{ scope.row.address }}</p>
    <div slot="reference" class="name-wrapper">
      <el-tag size="medium">{{ scope.row.name }}</el-tag>
    </div>
  </el-popover> 
```  
注意:  
<el-table :key="1">  
其中key这个属性怎么都没查到.  

最后,带issue里面查到了说明https://github.com/PanJiaChen/vue-element-admin/issues/656.  

原来这个key属性是vue自带特殊属性,主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不更新这个key的话,显示隐藏列的时候,部分DOM不会重新渲染,导致table变化时候没有动画过度,显得很生硬.  

参考vue说明:https://cn.vuejs.org/v2/api/#key  


> 13 对象拷贝  

```js
//赋值对象是一个obj
this.objData=Object.assign({}, row) //这样就不会共用同一个对象 v-model有时候界面无法修改了，就得考虑用assign拷贝整个对象进行赋值

//数组我们也有一个巧妙的防范 只支持浅拷贝 如["1","2"]
newArray = oldArray.slice(); //slice会clone返回一个新数组 

//多层的还可以用jsonSerializable 支持深拷贝
JSON.parse(JSON.stringify(data))

//数组或对象的深度拷贝，arrayHelper还封装了通用方法
let newObj = deepCopy(obj)
```

 

> 15 props & data

父子组件传值的时候，props的数据是双向绑定的，直接修改即可。  
父子组件传值的时候，v-model=data.a, data.a是通过props关联过来，这样父组件修改传的值，v-model在dom上是不会自动绑定修改的。  

可通过watch实现其绑定修改。  

> 16 watch  

watch的坑，直接string/number会触发，但obj一个对象，内部属性变化不用触发监听。  
此时对应的watch需修改为:  
```js
{
  deep: true,
  handler: function (newVal,oldVal){
      console.log('newValue', newVal);
      console.log('oldValue', oldVal.text);
  }
}
```
> 17 drag dialog 

```html
<el-dialog v-el-drag-dialog  ...
```

一般情况加上
```css
:close-on-click-modal="false"
```

> 19 vue 生命周期  

beforecreate : 举个栗子：可以在这加个loading事件   
created ：在这结束loading，还做一些初始化，实现函数自执行   
mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情  
beforeDestroy： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容  

 
> 21 Sortable

拖拽列表使用的时候，对应table一定要先设置 row-key="id"

> 22 this.$nextTick

vue生命周期中提供了created,mounted方法，可以在页面初始化时候获取一些页面需要的数据，但是有的时候需要根据数据动态的为页面某些dom元素添加事件，这就要求在dom元素渲染完毕时去设置，但是created与mounted函数执行时一般dom并没有渲染完毕，所以就会出现获取不到，添加不了事件的问题.

我之前的解决办法是定义一个变量，判断数据是否发生变化，在updated内通过该变量判断是否进行相关操作。

其实vue已经给我们提供了一个机制 

```js  
this.$nextTick(() => {   
}); 
```

vm.$nextTick( [callback] )函数的用法：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。(`即数据更新-->dom变化-->再回调我们的业务代码`)

因此可以在created或者mounted函数中使用vm.$nextTick( [callback] )函数，来为需要添加事件的dom元素添加事件


> 23 dialog 自定义样式

dialog width height等自身style通过设置custom-class

```js
<el-dialog custom-class="editDialog">
  <div class="editDialog-container">
  <div>
</el-dialog>
```

注意由于element ui dialog样式是全局样式，写在scope内是无效的。

所以定义为全局变量，同时注意custom-class=`全局唯一样式名`

常用 
```css
<style>
.editDialog{ /*dialog的宽度 高度不定义即随内容auto*/
  width: 800px; 
}
.editDialog-container{  /*设定内容的高度 防止撑太长*/
  height:500px;
  overflow-y: auto;
}
</style>
```


> 24 views 

所有页面均放置于views folder下，不能放于别处，以防动态加载时获取不到。且views下不能存放任何.js .vue以外的文件，同时.js .vue需有default export content.

> 25 meta 

this.$router.app._route.meta

> 26 Layout建立文件夹

先考虑功能划分，再细分模块 即 layout/sysManage √  sysManage/layout × 


> 28 页面数据时而出来，时而不出来

很有可能是数据绑定的值没有初始化值，为undifiend

```js
obj:{
}
<component :val="obj.a" />
...
obj.a = "123";
```

如上，obj.a未初始化，为undefiend,然后获取数据后设置obj.a = "123";此时很有可能不会触发页面更新。
解决：

```js
obj:{
  a:""//进行初始化即可
}
```

> 29 国际化在vm实例化方式创建、挂载组件时报错，Cannot read property '_t' of undefined"

解决：
```js
import i18n from “@/lang”;
…
let Constructor = Vue.extend(module.default);
let vm = new Constructor({ el: '#mount-individual',i18n });
```

> 30 增删改查页面demo 参考 layout/layoutSetting/list&edit 

所有的输入框样式为：class="form-input-item" 
header上的button 默认即可
toolbar上的button 均设置size="mini"


> 31 loading 

table、button loading参考文档

这里对应一些简单的提示loading，可用以下形式 
<el-button v-if="loading" :loading="loading" type="text">加载account</el-button>

> 32 timer 解决触发频率太高状况

```js
if(this.timer){
    clearTimeout(this.timer);//clear previous timer
} 
this.timer = setTimeout(() => {
    //do something
}, 300); 
 
```
 
> 33 按钮选择隐藏还是禁用？

有些按钮，会根据选中行的信息变化其状态，这时候就有两种选择，可以用v-show来控制隐藏显示，也可以用disabled来控制禁用与否。 选择原则: 1 不能让界面出现“抖动”,如toolbar上的按钮全都隐藏后，table会明显往上升。这时最好使用disabled。

> 34 添加api

全局搜索要添加的api对应的url，是否已存在，若已存在，是否可复用。
若要复用，根据业务情况选择直接使用or import 已存在的api再新建api，在其中使用。

特别注意下载api的使用。api/file/fileDownload


> 35 新建一个模块步骤

不要还没代码就先在菜单表里加记录，正确步骤应该是，先在api/menu/constantMenus中新建一个本地的临时菜单项，等到所有代码开发完成，将其注释或删除，然后再系统管理/菜单里新建对应的菜单项。

> 36 代码格式

```js
/**
 * !不要留一堆空行
 */
```
 
> 37 下拉列表数据

下拉数据统一在api.then中进行格式处理, value & label

```js
{
  ...item,
  value:item.xxx,
  label:item.xxxx,
}
```

> 38 demo 介绍

注意几种类型下的参数传递以及该有的注释不能少。比如下面情况

```js
 /** 
  * @param {code} 
  * @param {pId} 
  * @param {clauseType}
  * @param {type}  
  * @other: 
  */
params(newVal,oldVal) {
  //1 clear validate
  if(this.$refs["dataForm"]) {
    this.$refs["dataForm"].clearValidate();
  }
  //2 query request
  this.getForm(); 
}
```

> 39 rule 内进行请求

学会使用async await + promise

```js
const validateName = async (rule,value,callback) => {
    if(!value) {
      callback(new Error("条款名称不能为空"));
    } else {
      await checkClauseName(this.dataBind.name);
      callback();
    }
}
```

> 40 界面重渲染时灵时不灵

有可能是因为数据层次太深，导致数据变化=>界面响应失效。

```js
 this.$forceUpdate();//数据层次太多，没有触发render函数进行自动更新，需手动调用\

 或者

 this.$nextTick(()=>{
  this.$forceUpdate();//数据层次太多，没有触发render函数进行自动更新，需手动调用 
}); 
```
 