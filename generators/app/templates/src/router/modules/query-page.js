import Layout from '@/layout/index'

export default {
  path: '/query-page',
  component: Layout,
  redirect: '/query-page/detail-query',
  meta: { title: '查询页', icon: 'nested' },
  children: [
    {
      path: 'detail-query',
      name: 'DetailQuery',
      component: () => import('@/views/query-pages/detail-query/index'),
      meta: { title: '基础查询页', icon: 'component' }
    }
  ]
}
