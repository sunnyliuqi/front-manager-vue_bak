import path from '../index'
import { axios } from '@/utils/request'
import parsePageParams from '@/utils/page'

// 分页
export function queryList (data) {
  return axios({
    url: path.default + '/dict',
    method: 'POST',
    data: data,
    params: parsePageParams(data)
  })
}

// 保存
export function save (data) {
  return axios({
    url: path.default + '/dict/add',
    method: 'PUT',
    data: data
  })
}

// 修改
export function update (data) {
  return axios({
    url: path.default + '/dict/update',
    method: 'PUT',
    data: data
  })
}

// 删除
export function del (data) {
  return axios({
    url: path.default + '/dict',
    method: 'DELETE',
    data: data
  })
}

// 获取详情
export async function get (params) {
  return axios({
    url: path.default + '/dict/' + params.id,
    method: 'GET'
  })
}

// 检查类别
export async function checkType (params) {
  return axios({
    url: path.default + '/dict/checkType',
    method: 'GET',
    // id=params.id&type=params.type
    params: params
  })
}

// 获取所有的字典数据
export async function getAllDict () {
  return axios({
    url: path.default + '/dict/allType',
    method: 'GET'
  })
}
