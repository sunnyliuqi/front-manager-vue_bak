import path from '@/api/index'
import {
  axios
} from '@/utils/request'
import parsePageParams from '@/utils/page'
// 分页
export function queryList (data) {
  return axios({
    url: path.sys + '/role',
    method: 'POST',
    data: data,
    params: parsePageParams(data)
  })
}

// 保存
export function save (data) {
  return axios({
    url: path.sys + '/role/add',
    method: 'PUT',
    data: data
  })
}

// 修改
export function update (data) {
  return axios({
    url: path.sys + '/role/update',
    method: 'PUT',
    data: data
  })
}

// 删除
export function del (data) {
  return axios({
    url: path.sys + '/role',
    method: 'DELETE',
    data: data
  })
}

// 获取详情
export function get (params) {
  return axios({
    url: path.sys + '/role/' + params.id,
    method: 'GET'
  })
}
// 角色列表
export function roleList () {
  return axios({
    url: path.sys + '/role/roleList',
    method: 'GET'
  })
}

// 角色下的菜单
export function getRoleMenus (params) {
  return axios({
    url: path.sys + '/role/roleMenus/' + params.id,
    method: 'GET'
  })
}
