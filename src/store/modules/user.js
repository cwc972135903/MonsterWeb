/*
 * @Descripttion: user vuex
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2019-09-20 17:43:16
 * @LastEditors: hangjie.zhu
 * @LastEditTime: 2020-11-05 18:11:34
 */
import { logout, getInfo,loginXcrms } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router' 

const state = {
  userId:'',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  codes:[]
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_CODES: (state, codes) => {
    state.codes = codes
  },
  SET_USERID:(state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) { 
    const { username, password } = userInfo
    return new Promise((resolve, reject) => { 
      // loginXcrms({ userAccount: username.trim(), userPassword: password }).then(response => { 
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => { 
      //   reject(error)
      // })
      //todo：测试数据，后面需要改成真正的接口返回数据
      const { data } = {"code":200,"data":{"token":"324362eb96c1aeab4b6f0d8a42001dc3","expire":720},"msg":"success"};
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      resolve()
    })
  },

  /**
   * @name: 自动登陆
   * @param {cookieValue} 其他统一身份认证平台生成的cookie值
   * @return: 
   * @other: 
   */
  autoLogin({ commit }, token){
    return new Promise((resolve, reject) => {  
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) { 
    return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => { 
    //     const { data } = response

    //     if (!data) {
    //       reject('Verification failed, please Login again.')
    //     }

    //     const { roles, codes, name, avatar, introduction, userId } = data
        
    //     // roles must be a non-empty array
    //     if (!roles || roles.length <= 0) {
    //       reject('getInfo: roles must be a non-null array!')
    //     }

    //     commit('SET_ROLES', roles)
    //     commit('SET_CODES', codes)
    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     commit('SET_INTRODUCTION', introduction)
    //     commit('SET_USERID', userId)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
        //todo：测试数据，后面需要改成真正的接口返回数据
        const { data } = {
          "code": 200,
          "data":{
            "codes": ["ratingObjManage", "corplist", "bondlist", "asbDealList", "trustPlanQuery", "tiplanList", "industryManage", "regionManage", "macroManage", "archiveFileManage", "eventManageList", "workflow", "wfNodeManage", "taskRunningList", "taskDealedList", "processManageList", "CorpFirstRating", "CorpTrackingRating", "bondFirstRating", "ratingObjManage", "corplist", "bondlist", "trustPlanQuery", "tiplanList", "industryManage", "regionManage", "macroManage", "archiveFileManage", "eventManageList", "workflow", "bpmdTrackingRating", "trustFirstRating", "trustTrackingRating", "creditFirstRating", "creditTrackingRating", "ratingManage", "ratingCorp", "ratingTrustStart", "ratingDeptStart", "ratingBondStart", "ratingResultAdjustList", "earlyWarningManage", "pboSubscribeQueryNew", "financeLossWarn", "warningResult", "bondPool", "bondPoolList", "bondInPoolAgain", "bondPoolAdjustLog", "corpPool", "tcorpPoolList", "corpInPoolAgain", "ztk02", "nonstandardPool", "nonstandardInPoolAgain", "nonstandardPoolAdjustLog", "tbndpool", "tbndInPoolAgain", "tbndPoolAdjustLog", "dimensionCoe", "dimensionCoeAll", "limitRuleConfig", "statisticAndQuery", "creditMatrixStatistics", "financialAnalysis", "quotaConfigure", "dynamicDataAnalysis", "ratingModel", "integrationElementList", "gradeStrategy", "ratingModelTemplate", "modelOpenClass", "ratingModelList", "ratingModelEdit", "ratingStepList", "ratingResultTest", "paramsConfig", "report", "reportDataSource", "reportSettingList", "reportPreview", "businessLineConfig", "gradeModelList", "creditAdjustConfig", "tableIndex", "industryConfig", "finalReport", "bondPoolConfig", "documentTemplate", "taskRunningList", "taskDealedList", "processManageList", "CorpFirstRating", "CorpTrackingRating", "bondFirstRating", "bpmdTrackingRating", "trustFirstRating", "trustTrackingRating", "creditFirstRating", "creditTrackingRating", "ratingManage", "ratingCorp", "ratingTrustStart", "ratingDeptStart", "ratingBondStart", "earlyWarningManage", "pboSubscribeQueryNew", "financeLossWarn", "warningResult", "bondPool", "bondPoolList", "bondInPoolAgain", "bondPoolAdjustLog", "corpPool", "tcorpPoolList", "corpInPoolAgain", "ztk02", "statisticAndQuery", "financialAnalysis", "quotaConfigure", "dynamicDataAnalysis", "ratingModel", "integrationElementList", "gradeStrategy", "ratingModelTemplate", "modelOpenClass", "ratingModelList", "ratingModelEdit", "ratingStepList", "ratingResultTest", "paramsConfig", "gradeModelList", "businessLineConfig", "creditAdjustConfig", "tableIndex", "industryConfig", "finalReport", "bondPoolConfig", "clauseConfig", "sysManage", "job", "jobType", "jobList", "jobLog", "tcrtRedisConfig", "userList", "departmentList", "roleList", "overView", "logManage", "loginLog", "actionLog", "runningLog", "clauseConfig", "bizDataBatchImport", "similarBond", "simBond", "groupBond", "layoutManage", "fieldSetting", "layoutGroupSetting", "fieldList", "layoutComponentList", "layoutVChartsSetting", "layoutVChartsTemplate", "myDesktop", "sysManage", "job", "jobType", "jobList", "jobLog", "tcrtRedisConfig", "userList", "departmentList", "roleList", "menuList", "layoutSetting", "overView", "userListCommonDemo", "logManage", "loginLog", "actionLog", "runningLog", "auditManage", "auditConfigList", "auditDataList"],
            "introduction": null,
            "name": "管理员2",
            "phone": null,
            "roles": ["event-data-delete", "event-data-insert", "event-data-edit", "doc-upload", "event-data-edit", "event-data-insert", "event-data-delete", "RATING_CAL_TEMP", "RATING_INPUT_TEMP", "pool-data-upload", "pool-data-export", "pool-data-template", "pool-data-edit", "pool-data-adjust", "tcorp-data-upload", "tcorp-data-export", "tcorp-data-template", "tcorp-data-singleInPool", "tcorp-data-adjust", "ie-delete", "ie-change", "ie-stop", "ie-errconfig", "ie-add", "ie-edit", "ieclass-edit", "ieclass-delete", "ieclass-add", "ie-check", "ratingstepcom-add", "ratingstep-delete", "ratingstep-edit", "ratingstep-add", "ratingstepclass-edit", "ratingstepclass-delete", "ratingstepclass-add", "RATING_CAL_TEMP", "RATING_INPUT_TEMP", "pool-data-upload", "pool-data-export", "pool-data-template", "pool-data-edit", "pool-data-adjust", "tcorp-data-upload", "tcorp-data-export", "tcorp-data-template", "tcorp-data-singleInPool", "tcorp-data-adjust", "ieclass-add", "ieclass-delete", "ieclass-edit", "ie-edit", "ie-add", "ie-delete", "ie-change", "ie-stop", "ie-check", "ie-errconfig", "ratingstepcom-add", "ratingstepclass-delete", "ratingstepclass-add", "ratingstepclass-edit", "ratingstep-add", "ratingstep-edit", "ratingstep-delete"],
            "userId": "ADD26ED6A57A4065E0534E00BE0A9400"
          },
          msg: "success"
        }
        const { roles, codes, name, avatar, introduction, userId } = {
          "codes": ["ratingObjManage", "corplist", "bondlist", "asbDealList", "trustPlanQuery", "tiplanList", "industryManage", "regionManage", "macroManage", "archiveFileManage", "eventManageList", "workflow", "wfNodeManage", "taskRunningList", "taskDealedList", "processManageList", "CorpFirstRating", "CorpTrackingRating", "bondFirstRating", "ratingObjManage", "corplist", "bondlist", "trustPlanQuery", "tiplanList", "industryManage", "regionManage", "macroManage", "archiveFileManage", "eventManageList", "workflow", "bpmdTrackingRating", "trustFirstRating", "trustTrackingRating", "creditFirstRating", "creditTrackingRating", "ratingManage", "ratingCorp", "ratingTrustStart", "ratingDeptStart", "ratingBondStart", "ratingResultAdjustList", "earlyWarningManage", "pboSubscribeQueryNew", "financeLossWarn", "warningResult", "bondPool", "bondPoolList", "bondInPoolAgain", "bondPoolAdjustLog", "corpPool", "tcorpPoolList", "corpInPoolAgain", "ztk02", "nonstandardPool", "nonstandardInPoolAgain", "nonstandardPoolAdjustLog", "tbndpool", "tbndInPoolAgain", "tbndPoolAdjustLog", "dimensionCoe", "dimensionCoeAll", "limitRuleConfig", "statisticAndQuery", "creditMatrixStatistics", "financialAnalysis", "quotaConfigure", "dynamicDataAnalysis", "ratingModel", "integrationElementList", "gradeStrategy", "ratingModelTemplate", "modelOpenClass", "ratingModelList", "ratingModelEdit", "ratingStepList", "ratingResultTest", "paramsConfig", "report", "reportDataSource", "reportSettingList", "reportPreview", "businessLineConfig", "gradeModelList", "creditAdjustConfig", "tableIndex", "industryConfig", "finalReport", "bondPoolConfig", "documentTemplate", "taskRunningList", "taskDealedList", "processManageList", "CorpFirstRating", "CorpTrackingRating", "bondFirstRating", "bpmdTrackingRating", "trustFirstRating", "trustTrackingRating", "creditFirstRating", "creditTrackingRating", "ratingManage", "ratingCorp", "ratingTrustStart", "ratingDeptStart", "ratingBondStart", "earlyWarningManage", "pboSubscribeQueryNew", "financeLossWarn", "warningResult", "bondPool", "bondPoolList", "bondInPoolAgain", "bondPoolAdjustLog", "corpPool", "tcorpPoolList", "corpInPoolAgain", "ztk02", "statisticAndQuery", "financialAnalysis", "quotaConfigure", "dynamicDataAnalysis", "ratingModel", "integrationElementList", "gradeStrategy", "ratingModelTemplate", "modelOpenClass", "ratingModelList", "ratingModelEdit", "ratingStepList", "ratingResultTest", "paramsConfig", "gradeModelList", "businessLineConfig", "creditAdjustConfig", "tableIndex", "industryConfig", "finalReport", "bondPoolConfig", "clauseConfig", "sysManage", "job", "jobType", "jobList", "jobLog", "tcrtRedisConfig", "userList", "departmentList", "roleList", "overView", "logManage", "loginLog", "actionLog", "runningLog", "clauseConfig", "bizDataBatchImport", "similarBond", "simBond", "groupBond", "layoutManage", "fieldSetting", "layoutGroupSetting", "fieldList", "layoutComponentList", "layoutVChartsSetting", "layoutVChartsTemplate", "myDesktop", "sysManage", "job", "jobType", "jobList", "jobLog", "tcrtRedisConfig", "userList", "departmentList", "roleList", "menuList", "layoutSetting", "overView", "userListCommonDemo", "logManage", "loginLog", "actionLog", "runningLog", "auditManage", "auditConfigList", "auditDataList"],
          "introduction": null,
          "name": "管理员2",
          "phone": null,
          "roles": ["event-data-delete", "event-data-insert", "event-data-edit", "doc-upload", "event-data-edit", "event-data-insert", "event-data-delete", "RATING_CAL_TEMP", "RATING_INPUT_TEMP", "pool-data-upload", "pool-data-export", "pool-data-template", "pool-data-edit", "pool-data-adjust", "tcorp-data-upload", "tcorp-data-export", "tcorp-data-template", "tcorp-data-singleInPool", "tcorp-data-adjust", "ie-delete", "ie-change", "ie-stop", "ie-errconfig", "ie-add", "ie-edit", "ieclass-edit", "ieclass-delete", "ieclass-add", "ie-check", "ratingstepcom-add", "ratingstep-delete", "ratingstep-edit", "ratingstep-add", "ratingstepclass-edit", "ratingstepclass-delete", "ratingstepclass-add", "RATING_CAL_TEMP", "RATING_INPUT_TEMP", "pool-data-upload", "pool-data-export", "pool-data-template", "pool-data-edit", "pool-data-adjust", "tcorp-data-upload", "tcorp-data-export", "tcorp-data-template", "tcorp-data-singleInPool", "tcorp-data-adjust", "ieclass-add", "ieclass-delete", "ieclass-edit", "ie-edit", "ie-add", "ie-delete", "ie-change", "ie-stop", "ie-check", "ie-errconfig", "ratingstepcom-add", "ratingstepclass-delete", "ratingstepclass-add", "ratingstepclass-edit", "ratingstep-add", "ratingstep-edit", "ratingstep-delete"],
          "userId": "ADD26ED6A57A4065E0534E00BE0A9400"
        }
        
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        
        commit('SET_ROLES', roles)
        commit('SET_CODES', codes)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_USERID', userId)
        resolve(data)
     })
        
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   commit('SET_CODES', [])
      //   removeToken()
      //   resetRouter()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // }) 
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_CODES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_CODES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)
       
      const {codes} = await dispatch('getInfo')

      resetRouter()
      //  debugger
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', codes, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
