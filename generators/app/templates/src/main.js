import Vue from 'vue'
import store from './store/index.js'
import router from './router/index.js'
import App from './App.vue'

import ElementUI from 'element-ui'

/* 导入全局函数 */
import '@/router/guards' // 引入全局路由守卫
import '@/icons' // svg icon生成函数
import '@/exceptions/error-handler.js' // 全局错误处理

/* 导入全局样式 */
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css' // 使用element-ui cli生成的默认主题
import '@/styles/index.scss' // 全局自定义的样式

/* 加载全局插件 */
Vue.use(ElementUI)
/* 关闭vue的多余提示 */
Vue.config.productionTip = false

/* 创建Vue实例 */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App) // 将App挂载到public/index.html的div#root节点
})
