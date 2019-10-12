import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // {
      //   path: 'page1',
      //   name: 'page1',
      //   meta: {
      //     title: '公司成就',
      //     auth: true,
      //     cache: true
      //   },
      //   component: _import('demo/page1')
      // },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '店铺诊断',
          auth: true,
          cache: true
        },
        component: _import('demo/page2')
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '首页轮播图',
          auth: true,
          cache: true
        },
        component: _import('demo/page3')
      },
      {
        path: 'page4',
        name: 'page4',
        meta: {
          title: '企业动态列表',
          auth: true
        },
        component: _import('demo/page4')
      },
      {
        path: 'page5',
        name: 'page5',
        meta: {
          title: '电商动态列表',
          auth: true
        },
        component: _import('demo/page5')
      },
      {
        path: 'page6',
        name: 'page6',
        meta: {
          title: '开课列表',
          auth: true,
          cache: true
        },
        component: _import('demo/page6')
      },
      {
        path: 'page7',
        name: 'page7',
        meta: {
          title: '预约人员',
          auth: true,
          cache: true
        },
        component: _import('demo/page7')
      },
      {
        path: 'page8',
        name: 'page8',
        meta: {
          title: '教师信息列表',
          auth: true
        },
        component: _import('demo/page8')
      },
      // {
      //   path: 'page9',
      //   name: 'page9',
      //   meta: {
      //     title: '首页导航',
      //     auth: true,
      //     cache: true
      //   },
      //   component: _import('demo/page9')
      // },
      {
        path: 'page10',
        name: 'page10',
        meta: {
          title: '课程列表',
          auth: true,
          cache: true
        },
        component: _import('demo/page10')
      },
      {
        path: 'page11',
        name: 'page11',
        meta: {
          title: '电商资源二维码',
          auth: true,
          cache: true
        },
        component: _import('demo/page11')
      },
      {
        path: 'page12',
        name: 'page12',
        meta: {
          title: '分类',
          auth: true,
          cache: true
        },
        component: _import('demo/page12')
      },
      {
        path: 'page13',
        name: 'page13',
        meta: {
          title: '公益资讯列表',
          auth: true
        },
        component: _import('demo/page13')
      },
      {
        path: 'page14',
        name: 'page14',
        meta: {
          title: '成功案例列表',
          auth: true
        },
        component: _import('demo/page14')
      },
      {
        path: 'page15',
        name: 'page15',
        meta: {
          title: '电商渠道列表',
          auth: true
        },
        component: _import('demo/page15')
      },
      {
        path: 'page16',
        name: 'page16',
        meta: {
          title: '教师反馈列表',
          auth: true
        },
        component: _import('demo/page16')
      },
      {
        path: 'page17',
        name: 'page17',
        meta: {
          title: '渠道分类',
          auth: true
        },
        component: _import('demo/page17')
      },
      {
        path: 'page18',
        name: 'page18',
        meta: {
          title: '电商渠道轮播图',
          auth: true
        },
        component: _import('demo/page18')
      },
      {
        path: 'page19',
        name: 'page19',
        meta: {
          title: '官网注册列表',
          auth: true
        },
        component: _import('demo/page19')
      },
      {
        path: 'pageadd1',
        name: 'pageadd1',
        meta: {
          title: '企业动态列表',
          auth: true
        },
        component: _import('demo/pageadd1')
      },
      {
        path: 'pageadd2',
        name: 'pageadd2',
        meta: {
          title: '电商动态',
          auth: true
        },
        component: _import('demo/pageadd2')
      },
      {
        path: 'pageadd3',
        name: 'pageadd3',
        meta: {
          title: '教师信息',
          auth: true
        },
        component: _import('demo/pageadd3')
      },
      {
        path: 'pageadd4',
        name: 'pageadd4',
        meta: {
          title: '公益资讯',
          auth: true
        },
        component: _import('demo/pageadd4')
      },
      {
        path: 'pageadd5',
        name: 'pageadd5',
        meta: {
          title: '成功案例',
          auth: true
        },
        component: _import('demo/pageadd5')
      },
      {
        path: 'pageadd6',
        name: 'pageadd6',
        meta: {
          title: '电商渠道',
          auth: true
        },
        component: _import('demo/pageadd6')
      },
      {
        path: 'pageuser',
        name: 'pageuser',
        meta: {
          title: '角色',
          auth: true
        },
        component: _import('demo/pageuser')
      },
      {
        path: 'pageuserlist',
        name: 'pageuserlist',
        meta: {
          title: '职员列表',
          auth: true
        },
        component: _import('demo/pageuserlist')
      },
      // 添加数据
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
