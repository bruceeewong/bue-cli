/**
 * 全局错误处理
 *
 * 参考: http://jartto.wang/2018/11/20/js-exception-handling/
 */

import Vue from 'vue'
import store from '@/store'
import settings from '@/settings.js'
import { Message } from 'element-ui'
import { checkNeed } from '@/utils/error-log.js'
import BaseException from '@/exceptions/base-exception'

// 在 settings.js 中设置需要显示错误日志的环境
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings
const isDev = process.env.NODE_ENV === 'development'

// 处理 Vue 实例中抛出的错误
Vue.config.errorHandler = function(err, vm, info) {
  // 更多全局错误处理函数 写在下面---
  // ---
  if (err instanceof BaseException) {
    // 捕获vue组件中主动抛出的错误
    Message.error(`${err.type}: ${err.message}`)
    return
  }

  // 启用错误调试面板组件, 并将错误信息添加到错误栈中;
  if (checkNeed(needErrorLog)) {
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
    })
  }
  Message.error(err.message)
  window.console.error(err)
}

// 当 JS 运行时错误发生时，window 会触发一个 ErrorEvent 接口的 error 事件，并执行 window.onerror()
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：', { message, source, lineno, colno, error })
  if (!isDev) {
    return true // 正式环境禁掉控制台报错
  }
}

// 资源（如图片或脚本）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件
window.addEventListener('error', (error) => {
  console.log('捕获到异常：', error)
}, true)

// 全局 unhandledrejection 错误捕获，ajax请求、未捕获的异步错误会在这里被捕获
window.addEventListener('unhandledrejection', (event) => {
  // 禁掉默认行为(浏览器控制台报 Uncaught Promise)
  event.preventDefault()
  event.promise.catch((err) => {
    if (err instanceof BaseException) {
      // 自定义的异常类会有 type 属性，如 ValidationException 的 type 为 "参数校验失败"
      Message.error(`${err.type}: ${err.message}`)
    } else {
      Message.error(`未捕获错误: ${err}`)
    }
  })
})

