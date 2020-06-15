import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

/**
 * 配置说明
 * 详情: https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/
 *
 * hidden: true                   if set true(default is false), 该菜单项不会显示在左菜单栏
 * alwaysShow: true               if set true, 始终显示该菜单项的 root 菜单
 *                                if not set alwaysShow, 当子路由配置数量大于1时,
 *                                  会显示嵌套菜单, 否则只显示子菜单项,不显示 root 菜单
 * redirect: noRedirect           if set noRedirect, 该项在面包屑中不会重定向
 * name:'router-name'             此名称用于 <keep-alive> (必须设置!!!)
 * meta : {
    roles: ['admin','editor']    设置页面的可访问的角色, 用于权限控制 (可以设置多个角色)
    title: 'title'               此名称会显示在左栏以及面包屑 (腿甲设置)
    icon: 'svg-name'             此 icon 会显示在左栏
    breadcrumb: false            if set false(default is true), 该项在面包屑中会隐藏
    activeMenu: '/example/list'  if set path, 左栏会高亮你设置的路径
  }
 */

/**
 * 静态路由配置
 * 无需特殊权限配置或动态生成的页面都在此配置
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 页必须放最后, 所有未命中的路由会跳转至404
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 动态路由配置
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 详情: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
