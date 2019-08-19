import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'
import { VueAxios } from './axios'
import { ACCESS_TOKEN, API_NO_AUTHORIZATIONS } from '@/store/mutation-types'

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
      router.push('/403')
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
      router.push('/500')
    }
    if (error.response.status >= 404 && error.response.status < 422) {
      router.push('/404')
    }
  }
  // return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  //  是否需要会话
  const isAuth = !(API_NO_AUTHORIZATIONS.includes(config.url))

  if (isAuth) {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  // console.log('接口服务响应数据：' + JSON.stringify(response.data))
  if (response.data.code !== 10000 && response.data.code !== 0) {
    message.error(response.data.msg)
  }
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
