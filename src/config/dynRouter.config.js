import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'
export const dynRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: '首页',
    static: true
  },
  redirect: '/auto/completeList',
  children: [{
    path: '/auto',
    name: 'auto',
    redirect: '/auto/completeList',
    component: PageView,
    meta: {
      title: '自动生成',
      keepAlive: true
    },
    children: [{
      path: '/auto/completeList',
      name: 'frame',
      component: () => import('@/views/auto/AutoList'),
      meta: {
        title: '代码生成',
        keepAlive: true
      }
    }]
  }, {
    path: '/sys',
    redirect: '/sys/user',
    component: PageView,
    meta: {
      title: '系统'
    },
    children: [{
      path: '/sys/user',
      name: 'user',
      component: () => import('@/views/sys/user/UserList'),
      meta: {
        title: '用户管理',
        keepAlive: true
      }
    }, {
      path: '/sys/personal',
      name: 'personal',
      hidden: true,
      component: () => import('@/views/user/UserInfo'),
      meta: {
        title: '个人资料',
        keepAlive: true,
        hidden: true,
        static: true
      }
    }]
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true,
  meta: {
    static: true
  }
}]
