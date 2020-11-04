import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + '/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: process.env.VUE_APP_BASE_API_ENTIRE + '/transaction/list',
    method: 'get',
    params: query
  })
}
