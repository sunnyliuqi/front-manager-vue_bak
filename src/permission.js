import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult', '/404', '/500'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (whiteList.includes(to.name) || whiteList.includes(to.fullPath)) {
    // 不需要登录
    next()
    NProgress.done()
  } else {
    // 需要登录
    if (Vue.ls.get(ACCESS_TOKEN)) {
      /* has token */
      if (to.path === '/user/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        if (Object.keys(store.getters.userInfo).length === 0) {
          store
            .dispatch('GetInfo')
            .catch(() => {
              store.dispatch('Logout').then(() => {
                next({ path: '/user/login', query: { redirect: to.fullPath } })
              })
            })
        }
        if (store.getters.serviceMenus.length === 0) {
          store
            .dispatch('GetMenus')
            .then(res => {
              console.log('当前用户拥有的菜单：' + JSON.stringify(res.result.menus))
              console.log('当前用户拥有的操作码：' + JSON.stringify(res.result.operationCodes))
              const menus = res.result.menus
              store.dispatch('GenerateRoutes', { menus }).then(() => {
                // 根据roles权限生成可访问的路由表
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                  next({ ...to, replace: true })
                } else {
                  // 跳转到目的路由
                  next({ path: redirect })
                }
              })
            })
            .catch(() => {
              store.dispatch('Logout').then(() => {
                next({ path: '/user/login', query: { redirect: to.fullPath } })
              })
            })
        } else {
          next()
        }
      }
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
