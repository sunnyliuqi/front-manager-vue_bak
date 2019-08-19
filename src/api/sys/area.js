import path from '../index'
import { axios } from '@/utils/request'
import parsePageParams from '@/utils/page'

// 分页
export function queryList (data) {
  return axios({
    url: path.default + '/area',
    method: 'POST',
    data: data,
    params: parsePageParams(data)
  })
}

// 保存
export function save (data) {
  return axios({
    url: path.default + '/area/add',
    method: 'PUT',
    data: data
  })
}

// 修改
export function update (data) {
  return axios({
    url: path.default + '/area/update',
    method: 'PUT',
    data: data
  })
}

// 删除
export function del (data) {
  return axios({
    url: path.default + '/area',
    method: 'DELETE',
    data: data
  })
}

// 获取详情
export function get (params) {
  return axios({
    url: path.default + '/area/' + params.id,
    method: 'GET'
  })
}

export function listTree () {
  return axios({
    url: path.default + '/area/listTree',
    method: 'GET'
  })
}

export function listTreeHasCounty () {
  return axios({
    url: path.default + '/area/listTreeHasCounty',
    method: 'GET'
  })
}

// 获取详情
export function checkCode (params) {
  return axios({
    url: path.default + '/area/checkCode',
    method: 'GET',
    // id=params.id&code=params.code
    params: params
  })
}

// 根据类别获取区域
export function getAreaByType (params) {
  return axios({
    url: path.default + '/area/getAreaByType',
    method: 'GET',
    // type=params.type&code=params.code
    params: params
  })
}
