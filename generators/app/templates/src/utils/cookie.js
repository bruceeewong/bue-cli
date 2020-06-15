import Cookies from 'js-cookie'
import Validate from '@/utils/validate.js'

class Cookie {
  /**
   * 获取值为key的cookie
   *
   * @static
   * @param {string} key
   * @returns {string}
   * @throws
   */
  static get(key) {
    if (!Validate.isString(key)) {
      throw new Error('getCookie key should be String!')
    }
    return Cookies.get(key)
  }

  /**
   * 设置cookie的key-value
   *
   * @static
   * @param {string} key
   * @param {string} value
   * @returns {string}
   * @throws
   */
  static set(key, value) {
    if (!Validate.isString(key) || !Validate.isString(value)) {
      throw new Error('setCookie key and value should be String!')
    }
    return Cookies.set(key, value)
  }

  /**
   * 删除对应key的cookie
   *
   * @static
   * @param {string} key
   * @returns {string}
   * @throws
   */
  static remove(key) {
    if (!Validate.isString(key)) {
      throw new Error('removeCookie key should be String!')
    }
    return Cookies.remove(key)
  }
}

export default Cookie
