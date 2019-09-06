// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页', static: true },
    redirect: '/auto/completeList',
    children: [

      // 自动生成
      {
        path: '/auto',
        name: 'auto',
        redirect: '/auto/completeList',
        component: PageView,
        meta: { title: '自动生成', keepAlive: true },
        children: [
          {
            path: '/auto/completeList',
            name: 'frame',
            component: () => import('@/views/auto/AutoList'),
            meta: { title: '代码生成', keepAlive: true }
          }
        ]
      },

      // 系统
      {
        path: '/sys',
        redirect: '/sys/user',
        component: PageView,
        meta: { title: '系统' },
        children: [
          {
            path: '/sys/user',
            name: 'user',
            component: () => import('@/views/sys/user/UserList'),
            meta: { title: '用户管理', keepAlive: true }
          },
          {
            path: '/sys/role',
            name: 'role',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '角色管理', keepAlive: true }
          },
          {
            path: '/sys/menu',
            name: 'menu',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '菜单管理', keepAlive: true }
          },
          {
            path: '/sys/api',
            name: 'api',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '接口管理', keepAlive: true }
          },
          {
            path: '/sys/organization',
            name: 'organization',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '组织机构', keepAlive: true }
          },
          {
            path: '/sys/log',
            name: 'log',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '操作日志', keepAlive: true }
          },
          {
            path: '/sys/dict',
            name: 'dict',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '数据字典', keepAlive: true }
          },
          {
            path: '/sys/area',
            name: 'area',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '区域管理', keepAlive: true }
          },
          {
            path: '/sys/personal',
            name: 'personal',
            hidden: true,
            component: () => import('@/views/user/UserInfo'),
            meta: { title: '个人资料', keepAlive: true, hidden: true, static: true }
          }
        ]
      }/* ,
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        hidden: true,
        meta: { title: '异常页', static: true },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/!* webpackChunkName: "fail" *!/ '@/views/exception/403'),
            meta: { title: '403', static: true }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/!* webpackChunkName: "fail" *!/ '@/views/exception/404'),
            meta: { title: '404', static: true }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/!* webpackChunkName: "fail" *!/ '@/views/exception/500'),
            meta: { title: '500', static: true }
          }
        ]
      } */
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true, meta: { static: true }
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }/* ,
      {
        path: 'register',
        name: 'register',
        component: () => import(/!* webpackChunkName: "user" *!/ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/!* webpackChunkName: "user" *!/ '@/views/user/RegisterResult')
      } */
    ]
  },

  /* {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  }, */
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500')
  }

]
