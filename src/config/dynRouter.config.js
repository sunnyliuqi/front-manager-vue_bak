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
      path: '/sys/role',
      name: 'role',
      component: () => import('@/views/form/stepForm/StepForm'),
      meta: {
        title: '角色管理',
        keepAlive: true
      }
    }, {
      path: '/sys/menu',
      name: 'menu',
      component: () => import('@/views/form/advancedForm/AdvancedForm'),
      meta: {
        title: '菜单管理',
        keepAlive: true
      }
    }, {
      path: '/sys/api',
      name: 'api',
      component: () => import('@/views/form/advancedForm/AdvancedForm'),
      meta: {
        title: '接口管理',
        keepAlive: true
      }
    }, {
      path: '/sys/organization',
      name: 'organization',
      component: () => import('@/views/form/advancedForm/AdvancedForm'),
      meta: {
        title: '组织机构',
        keepAlive: true
      }
    }, {
      path: '/sys/log',
      name: 'log',
      component: () => import('@/views/form/advancedForm/AdvancedForm'),
      meta: {
        title: '操作日志',
        keepAlive: true
      }
    }, {
      path: '/sys/dict',
      name: 'dict',
      component: () => import('@/views/form/advancedForm/AdvancedForm'),
      meta: {
        title: '数据字典',
        keepAlive: true
      }
    }, {
      path: '/sys/area',
      name: 'area',
      component: () => import('@/views/form/advancedForm/AdvancedForm'),
      meta: {
        title: '区域管理',
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
  }, {
    path: '/example',
    component: PageView,
    meta: {
      title: '示例',
      static: true
    },
    children: [{
      path: '/example/temp',
      name: 'temp',
      component: () => import('@/views/example/temp/TempList'),
      meta: {
        title: '模板',
        keepAlive: true,
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
