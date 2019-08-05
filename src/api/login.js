import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: '/loginjwt',
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    params: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: '/token/user',
    method: 'post'
  })
}

export function getMenus () {
  return axios({
    url: '/token/user/menus',
    method: 'post'
  })
}
export function logout () {
  return axios({
    url: '/logoutjwt',
    method: 'post'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
