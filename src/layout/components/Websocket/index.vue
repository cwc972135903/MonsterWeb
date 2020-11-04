<!--
 * @Descripttion: websocket全局
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-08-12 15:16:51
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-09-21 17:42:58
--> 

<template>
  <span /> 
</template>

<script>   
import { getToken } from '@/utils/auth'
import { mapState,mapActions } from "vuex";

/* eslint-disable no-console */
export default {
  name: "WebsocketGloabal",
  data() {
    return {
      timer: null,
      websocket: null
    }
  },
  computed: {
    ...mapState('websocket',{
      receiveNewMessage: state => state.socketTimestamp,
      connectionTagStr: state => state.connectionTagStr,
      connectionUsable: state => state.connectionUsable,
      reconnection: state => state.reconnection,
      reconnectionAttempts: state => state.reconnectionAttempts,
      reconnectionDelay: state => state.reconnectionDelay,
      reconnectionMaxAttempts: state => state.reconnectionMaxAttempts
    }),
  },
  watch: {
    receiveNewMessage(newVal) {
      let newWebsocketMessage=this.$store.state.websocket.newWebsocketMessage;
      console.log(`新消息 ${newWebsocketMessage.topic} %c ${JSON.stringify(newWebsocketMessage.data)}`,'font-size:12px;color:#42b983;'); 
    }
  },
  /** 
   * @name: 3.在mounted中初始化数据
   */
  mounted() {
    if (window.env.VUE_WEBSOCKET && window.env.VUE_WEBSOCKET.enable) {
        this.initData();
    } 
  },
  beforeDestroy() {
    if (window.env.VUE_WEBSOCKET && window.env.VUE_WEBSOCKET.enable) {
      this.onbeforeunload();
    }  
  },
  methods: {
    ...mapActions('websocket',['reveivedMessage','changeConnectionStatus','addReconnectionAttempt','resetReconnectionAttempt']),
    initData() {
      if('WebSocket' in window) { 
        // let userId=this.$route.query.userId;
        // if(!userId) {
        //   userId="admin"
        // }
        let userId = this.$store.getters.userId;
        const address = window.env.VUE_WEBSOCKET.baseAddress;
        this.websocket=new WebSocket(`${address}/websocket/connection/${userId}/`+getToken())
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    initWebSocket() {
      // 连接错误
      this.websocket.onerror=this.setErrorMessage
      // 连接成功
      this.websocket.onopen=this.setOnopenMessage
      // 收到消息的回调
      this.websocket.onmessage=this.setOnmessageMessage
      // 连接关闭的回调
      this.websocket.onclose=this.setOncloseMessage
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload=this.onbeforeunload
      //开启心跳 及重连机制
      this.startHeart();
    },
    setOnmessageMessage(event) {
      this.reveivedMessage(event.data);
    },
    setErrorMessage() {
      this.changeConnectionStatus(false);
      console.log('WebSocket连接发生错误   状态码：'+this.websocket.readyState + ' ' + new Date().getTime())
    },
    setOnopenMessage() {
      this.changeConnectionStatus(true);
      //连接成功后，重置尝试次数
      this.resetReconnectionAttempt();
      console.log('WebSocket连接成功    状态码：'+this.websocket.readyState + ' ' + new Date().getTime())
    },
    setOncloseMessage() {
      this.changeConnectionStatus(false);
      console.log('WebSocket连接关闭    状态码：'+this.websocket.readyState + ' ' + new Date().getTime())
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    },
    /**
     * @name: 开启心跳探测 确保当前连接可用
     * @param {type} 
     * @return {type} 
     * @other: 
     */
    startHeart: function() {
      if(this.reconnection != true){
        return;
      }
      if(this.timer) {
        //clear previous timer
        clearInterval(this.timer);
      }
      let that=this;
      this.timer=setInterval(() => {
        if(that.reconnectionAttempts>=that.reconnectionMaxAttempts) {
          //超过最大尝试次数 移除timer
          console.log('【重连超过最大尝试次数】websocket' + ' ' + new Date().getTime())
          clearInterval(that.timer);
        } else {
          if(that.connectionUsable) {
            //当前连接可用  
            that.websocket.send(that.connectionTagStr);
          } else {
            //当前连接已断
            that.initData();
            //尝试次数+1
            that.addReconnectionAttempt();
          }
        }

      },this.reconnectionDelay);
    },
    test() {
      this.websocket.send();
      // this.initData();
    }
  }
};
</script>
