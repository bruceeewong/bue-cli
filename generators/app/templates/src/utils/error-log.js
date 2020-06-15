import Validate from '@/utils/validate'

/**
 * 根据设置与当前环境, 检测是否需要开启错误调试日志
 * 当@/setting.js文件中设置了: errorLog: ['production', 'development']时返回true
 */
// eslint-disable-next-line import/prefer-default-export
export const checkNeed = (needErrorLog) => {
  const env = process.env.NODE_ENV
  if (Validate.isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (Validate.isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}
