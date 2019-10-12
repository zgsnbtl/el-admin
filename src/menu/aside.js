// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '官网注册',
    icon: 'folder-o',
    children: [
      { path: '/page19', title: '官网注册列表' }
    ]
  },
  {
    title: '店铺诊断',
    icon: 'folder-o',
    children: [
      { path: '/page2', title: '店铺诊断' }
    ]
  },
  {
    title: '首页轮播图',
    icon: 'folder-o',
    children: [
      { path: '/page3', title: '首页轮播图' }
    ]
  },
  {
    title: '企业动态',
    icon: 'folder-o',
    children: [
      { path: '/page4', title: '企业动态列表' },
      { path: '/pageadd1', title: '企业动态添加' }
    ]
  },
  {
    title: '电商动态',
    icon: 'folder-o',
    children: [
      { path: '/page4', title: '企业动态列表' },
      { path: '/pageadd1', title: '企业动态' }
    ]
  },
  {
    title: '数据管理',
    icon: 'folder-o',
    children: [
      // { path: '/page1', title: '公司成就' },
      { path: '/page2', title: '店铺诊断' },
      { path: '/page3', title: '首页轮播图' },
      { path: '/page4', title: '企业动态列表' },
      { path: '/page5', title: '电商动态列表' },
      { path: '/page6', title: '开课列表' },
      { path: '/page7', title: '预约人员' },
      { path: '/page8', title: '教师信息列表' },
      // { path: '/page9', title: '首页导航' },
      { path: '/page10', title: '课程列表' },
      { path: '/page11', title: '电商资源二维码' },
      { path: '/page12', title: '分类' },
      { path: '/page13', title: '公益资讯列表' },
      { path: '/page14', title: '成功案例列表' },
      { path: '/page15', title: '电商渠道列表' },
      { path: '/page16', title: '教师反馈列表' },
      { path: '/page17', title: '电商渠道分类' },
      { path: '/page18', title: '电商渠道轮播图' }
    ]
  },
  {
    title: '添加数据',
    icon: 'folder-o',
    children: [
      { path: '/pageadd1', title: '企业动态' },
      { path: '/pageadd2', title: '电商动态' },
      { path: '/pageadd3', title: '教师信息' },
      { path: '/pageadd4', title: '公益资讯' },
      { path: '/pageadd5', title: '成功案例' },
      { path: '/pageadd6', title: '电商渠道' }
    ]
  },
  {
    title: '权限管理',
    icon: 'folder-o',
    children: [
      { path: '/pageuser', title: '角色管理' },
      { path: '/pageuserlist', title: '职员列表' }
    ]
  }
]
