/*
 * @Descripttion: websocket
 * @version: 1.0
 * @Author: wenchao.chai
 * @Date: 2020-08-14 15:59:26
 * @LastEditors: wenchao.chai
 * @LastEditTime: 2020-08-14 16:24:22
 */
import request from "@/utils/request"; 

/**
 * @name: 退出 关闭websocket连接
 * @param {type} 
 * @return: 
 * @other: 
 */
export function websocketLogout() {
  return request({
    url:  "/sys/websocket/logout",
    method: "post"
  });
}
