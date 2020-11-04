import request from '@/utils/request'

export function getToken() {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
