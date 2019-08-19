import path from '../index'
import { axios } from '@/utils/request'
import parsePageParams from '@/utils/page'
// 分页
export function queryList (data) {
  return axios({
    url: path.default + '/user',
    method: 'POST',
    data: data,
    params: parsePageParams(data)
  })
}

// 保存
export function save (data) {
  return axios({
    url: path.default + '/user/add',
    method: 'PUT',
    data: data
  })
}

// 修改
export function update (data) {
  return axios({
    url: path.default + '/user/update',
    method: 'PUT',
    data: data
  })
}

// 删除
export function del (data) {
  return axios({
    url: path.default + '/user',
    method: 'DELETE',
    data: data
  })
}

// 启用禁用
export function enabled (data) {
  return axios({
    url: path.default + '/user/enabled',
    method: 'POST',
    data: data
  })
}

// 启用禁用
export function resetPassword (data) {
  return axios({
    url: path.default + '/user/resetPassword',
    method: 'POST',
    data: data
  })
}

// 获取详情
export function get (params) {
  return axios({
    url: path.default + '/user/' + params.id,
    method: 'GET'
  })
}
// 工号唯一性校验
export function checkWorkNum (params) {
  return axios({
    url: path.default + '/user/checkWorkNum',
    method: 'GET',
    // id=params.id&workNum=params.workNum
    params: params
  })
}
// 用户名唯一性校验
export function checkUserName (params) {
  return axios({
    url: path.default + '/user/checkUserName',
    method: 'GET',
    // id=params.id&userName=params.userName
    params: params
  })
}
// 所有用户列表
export function getUserAllList () {
  return axios({
    url: path.default + '/user/allList',
    method: 'GET'
  })
}
// 用户信息
export function getUserInfo () {
  return axios({
    url: path.default + '/user/getUserInfo',
    method: 'GET'
  })
}
