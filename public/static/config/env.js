/*
 * @Descripttion: 环境变量配置 可供部署后修改
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-02-24 10:54:03
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-09-28 19:12:41
 */
window.env = {
    VUE_ENV:"dev",//dev prod
    // base api for server xcrms
    VUE_APP_BASE_API_XCRMS_ENTIRE:"http://127.0.0.1:8090/xcrms",
    // 上传大小限制 M
    VUE_APP_UPLOAD_LIMIT : 120,
    // 是否启用图片滑动校验
    VUE_SLIDER_VALIDATE:false,
    // login 相关 
    // 登陆方式 XQUANT 衡泰 SPDB 浦发
    VUE_APP_LOGIN_TYPE : 'XQUANT',
    // LOGIN_TYPE = 'XQUANT'时默认为 '/login' 无需设置 直接跳转自动登陆页面，处理初始化信息
    VUE_APP_LOGIN_REDIRECT_FULL : 'https://www.cnblogs.com?redirect=http://localhost:8091/xcrms/sys/blankRequest',
    //websocket相关配置
    VUE_WEBSOCKET:{
        baseAddress:"ws://127.0.0.1:8088",//"ws://192.168.6.110:8088",
        enable:true,//是否启用websocket
        reconnection:false,//是否启用心跳及重连，默认false
        reconnectionMaxAttempts:5,//重连最大尝试次数  默认5
        reconnectionDelay:5000 //再次重连等待时常及心跳频率 ms 默认5000
    }
}