import path from '../index'
import { axios } from '@/utils/request'

// 分页
export function queryList () {
  return axios({
    url: path.default + '/organization/list',
    method: 'POST'
  })
}

// 保存
export function save (data) {
  return axios({
    url: path.default + '/organization/add',
    method: 'PUT',
    data: data
  })
}

// 修改
export function update (data) {
  return axios({
    url: path.default + '/organization/update',
    method: 'PUT',
    data: data
  })
}

// 删除
export function del (data) {
  return axios({
    url: path.default + '/organization',
    method: 'DELETE',
    data: data
  })
}

// 获取详情
export function get (params) {
  return axios({
    url: path.default + '/organization/' + params.id,
    method: 'GET'
  })
}

// 验证编码
export function checkCode (params) {
  return axios({
    url: path.default + '/organization/checkCode',
    method: 'GET',
    // id=params.id&code=params.code
    params: params
  })
}

// 组织机构树
export function treeList () {
  return axios({
    url: path.default + '/organization/treeList',
    method: 'GET'
  })
}
