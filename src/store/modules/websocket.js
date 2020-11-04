/*
 * @Descripttion: websocket vuex分发 集中管理
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-08-12 15:03:22
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-08-13 16:07:05
 * 业务组件监听socketTimestamp，比对topic，处理最新消息
 * 为何不直接监听newWebsocketMessage？是为了确保watch生效
 */
 
 /* eslint-disable no-console */
const websockConfig = {
  reconnection: window.env.VUE_WEBSOCKET ? window.env.VUE_WEBSOCKET.reconnection : false,//是否自动重连，默认false
  reconnectionMaxAttempts:  window.env.VUE_WEBSOCKET ? window.env.VUE_WEBSOCKET.reconnectionMaxAttempts :5,//重连最大尝试次数  默认5
  reconnectionDelay: window.env.VUE_WEBSOCKET ? window.env.VUE_WEBSOCKET.reconnectionDelay: 5000 //再次重连等待时常及心跳频率 ms 默认5000
}

const state = {
  connectionUsable:false,
  //发送心跳时的标识字符串
  connectionTagStr:"xcrms", 
  reconnection: websockConfig.reconnection, //(Boolean)是否自动重连，默认false    
  reconnectionMaxAttempts: websockConfig.reconnectionMaxAttempts, //重连最大次数               
  reconnectionAttempts: 0, // 已尝试重连次数
  reconnectionDelay: websockConfig.reconnectionDelay, //再次重连等待时常及心跳频率 ms  
  //消息集合
  websocketMessageList: [],
  newWebsocketMessage:null,
  socketTimestamp: new Date().getTime(),//时间戳去监听数据的改变
}

const mutations = {
  RECEIVED_MESSAGE: (state, msgDtoJson) => {
    if (msgDtoJson === state.connectionTagStr) {
      //心跳消息返回
      state.reconnectionAttempts = 0;
      console.log('websocket心跳,当前连接正常 ' + new Date().getTime());
    }else{
      state.reconnectionAttempts = 0;
      let msgDto = JSON.parse(msgDtoJson);
      if(state.websocketMessageList.find(c=>c.dataId == msgDto.dataId) != null){  
          console.log('重复推送 dataId:'+msgDto.dataId + ' ' + new Date().getTime());
      }else{
          let timeStamp = new Date().getTime();
          msgDto["timestamp"] = timeStamp;
          state.socketTimestamp = timeStamp;
          state.websocketMessageList.push(msgDto);
          state.newWebsocketMessage = msgDto; 
          console.log('新消息 dataId:'+ msgDto.dataId + ' ' + new Date().getTime()); 
      } 
    } 
  },
  CHANGE_CONNECTION_STATUS:(state, status) => {
    state.connectionUsable = status;
  },
  ADD_RECONNECTION_ATTEMPT:(state)=>{
    state.reconnectionAttempts++;
  },
  RESET_RECONNECTION_ATTEMPT:(state)=>{
    state.reconnectionAttempts = 0;
  }
}

const actions = {
  reveivedMessage({ commit }, msgDtoJson) {
    commit('RECEIVED_MESSAGE', msgDtoJson)
  },
  changeConnectionStatus({ commit }, status) {
    commit('CHANGE_CONNECTION_STATUS', status)
  },
  addReconnectionAttempt({ commit }){
    commit('ADD_RECONNECTION_ATTEMPT')
  },
  resetReconnectionAttempt({ commit }){
    commit('RESET_RECONNECTION_ATTEMPT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}