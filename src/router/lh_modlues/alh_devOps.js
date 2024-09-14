import Layout from '@/layout'

const alh_devOpsRouter = {
  path: '/alh_devOps',
  component: Layout,
  redirect: '/alh_devOps/alh_system/userList/index.vue',
  name: 'alh_devOps',
  meta: {
    title: '运维支撑',
    icon: 'nested'
  },
  children: [

    {
      path: 'userList',
      component: () =>
        import('@/views/alh_devOps/alh_system/userList/index.vue'),
      name: 'userList',
      meta: { title: '用户管理' }
    },
    {
      path: 'role',
      component: () =>
        import('@/views/alh_devOps/alh_system/role/index.vue'),
      name: 'role',
      meta: { title: '权限管理' }
    },
    {
      path: 'loglist',
      component: () =>
        import('@/views/alh_devOps/alh_system/loglist/index.vue'),
      name: 'loglist',
      meta: { title: '日志管理' }
    },
    {
      path: 'table',
      component: () =>
        import('@/views/alh_devOps/alh_system/table/index.vue'),
      name: 'table',
      meta: { title: '数据访问统计' }
    },
    {
      path: 'serve',
      component: () =>
        import('@/views/alh_devOps/alh_system/serve/index.vue'),
      name: 'serve',
      meta: { title: '服务使用登记' }
    },

    {
      path: 'watch_able',
      component: () =>
        import('@/views/alh_devOps/watch/watch_able/index.vue'),
      name: 'watch_able',
      meta: { title: '数据交换监控' }
    },
    {
      path: 'watch_status',
      component: () =>
        import('@/views/alh_devOps/watch/watch_status/index.vue'),
      name: 'watch_status',
      meta: { title: '系统状态监控' }
    },
    {
      path: 'tapList',
      component: () =>
        import('@/views/alh_devOps/watch/tapList/index.vue'),
      name: 'tapList',
      meta: { title: '资源目录建设' }
    },
    {
      path: 'address_list',
      component: () =>
        import('@/views/alh_devOps/watch/address_list/index.vue'),
      name: 'address_list',
      meta: { title: '地图图层管理' }
    },
    {
      path: 'address_name',
      component: () =>
        import('@/views/alh_devOps/watch/address_name/index.vue'),
      name: 'address_name',
      meta: { title: '地名地址' }
    },
    {
      path: 'space_list',
      component: () =>
        import('@/views/alh_devOps/watch/space_list/index.vue'),
      name: 'space_list',
      meta: { title: '空间数据管理' }
    },
    {
      path: 'space_status',
      component: () =>
        import('@/views/alh_devOps/watch/space_status/index.vue'),
      name: 'space_status',
      meta: { title: '数据分类与管理标准化' }
    },
    {
      path: 'address_list',
      component: () =>
        import('@/views/alh_devOps/watch/address_id/index.vue'),
      name: 'address_list',
      meta: { title: '地理编码管理' }
    },
    {
      path: 'watch_resource',
      component: () =>
        import('@/views/alh_devOps/watch/watch_resource/index.vue'),
      name: 'watch_resource',
      meta: { title: '资源管理行为监控' }
    },
    {
      path: 'contents_proccess',
      component: () =>
        import('@/views/alh_devOps/watch/contents_proccess/index.vue'),
      name: 'contents_proccess',
      meta: { title: '资源内容审核' }
    }

  ]
}

export default alh_devOpsRouter
