import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN, API_CONTENT_TYPE_FROM, API_NO_AUTHORIZATIONS } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: data.msg
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: data.msg
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
    if (error.response.status <= 504 && error.response.status >= 500) {
      this.$router.push('/exception/500')
    }
    if (error.response.status >= 404 && error.response.status < 422) {
      this.$router.push('/exception/404')
    }
  }
  // return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const apiNoAuth = API_NO_AUTHORIZATIONS
  //  是否需要会话
  if (apiNoAuth.indexOf(config.url) === -1) {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
  }
  const apiFrom = API_CONTENT_TYPE_FROM
  // 是否需要表单提交url
  if (apiFrom.indexOf(config.url) !== -1) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    if (!config.params) {
      config.params = config.data
    }
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
