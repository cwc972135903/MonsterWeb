<!--
 * @Descripttion: 国际化相关
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-04 12:13:24
 * @LastEditors  : wenchao.chai
 * @LastEditTime : 2020-02-04 13:22:54
 -->


### 国际化

`src\lang\index.js`

> <template>中使用

```js
<span>{{ $t('settings.tagsView') }}</span>
```

> js中使用i18n方法

```js
//判断key是否存在
this.$te('route.demo')

//获取key对应的value
this.$t('route.demo')
```

以上为i18n常用的方法，实际常用使用已封装在[i18n](/src\utils\i18n.js)

当前的语言选择用vuex进行全局管理(`this.$store.getters.language`)，从而可全局获取、设置。

同时，为了用户体验，语言选择作为一项偏好设置，缓存在cookie中。

