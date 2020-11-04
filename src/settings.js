/*
 * @Descripttion: 偏好默认设置
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:18
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-06-04 14:44:20
 */
import variables from '@/styles/element-variables.scss'

export default {
  theme: variables.theme,

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production','development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production','development']
   */
  errorLog: 'production',

  /**
   * @name: 布局TopContent与布局MainContent 间距为90，以防以后变更，所以设置为全局变量
   * @param {type} 
   * @return: 
   * @other: 用于页面baseHeight的设置，自由布局与普通页面的高度自适应所用 
   */
  marginHeightTopMainContent:90,
  /**
   * @name: 系统默认皮肤显示
   * @param {type} 
   * @return: 
   * @other: 
   */
  customTheme: 'custom-theme-1' //'default' 
}
