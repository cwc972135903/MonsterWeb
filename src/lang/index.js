/*
 * @Descripttion: i18n index
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-18 15:06:42
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-08-26 09:27:57
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
// import enLocale from './en'
// import zhLocale from './zh'
import esLocale from './es'

Vue.use(VueI18n)

const messages = {
  en: {
    ...window.lang.enLocale,
    ...elementEnLocale
  },
  zh: {
    // ...zhLocale,
    ...window.lang.zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages
})

export default i18n
