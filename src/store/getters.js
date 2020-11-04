/*
 * @Descripttion: export store getter
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-17 14:26:43
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-08-13 16:03:52
 */
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  opened:state => state.app.sidebar.opened,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  codes: state => state.user.codes,
  userId: state => state.user.userId,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  errorLogs: state => state.errorLog.logs,
  marginHeightTopMainContent: state => state.settings.marginHeightTopMainContent,
  customTheme:  state => state.settings.customTheme
}
export default getters
