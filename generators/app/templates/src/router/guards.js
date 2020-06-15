import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 全局路由入守卫
router.beforeEach(async(to, from, next) => {
  // 显示页面加载进度条
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // 放行路由
  next()
})

// 全局路由出守卫
router.afterEach(() => {
  // 完成页面加载进度条
  NProgress.done()
})
