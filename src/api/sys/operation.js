import path from '@/api/index'
import { axios } from '@/utils/request'
import parsePageParams from '@/utils/page'

// 分页
export function queryList (data) {
  return axios({
    url: path.sys + '/operation',
    method: 'POST',
    data: data,
    params: parsePageParams(data)
  })
}

// 保存
export function save (data) {
  return axios({
    url: path.sys + '/operation/add',
    method: 'PUT',
    data: data
  })
}

// 修改
export function update (data) {
  return axios({
    url: path.sys + '/operation/update',
    method: 'PUT',
    data: data
  })
}

// 删除
export function del (data) {
  return axios({
    url: path.sys + '/operation',
    method: 'DELETE',
    data: data
  })
}

// 获取详情
export function get (params) {
  return axios({
    url: path.sys + '/operation/' + params.id,
    method: 'GET'
  })
}
