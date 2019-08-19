import path from '../index'
import { axios } from '@/utils/request'
import parsePageParams from '@/utils/page'
// 分页
export function queryList (data) {
  return axios({
    url: path.default + '/log',
    method: 'POST',
    data: data,
    params: parsePageParams(data)
  })
}

// 获取详情
export function get (params) {
  return axios({
    url: path.default + '/log/' + params.id,
    method: 'GET'
  })
}
