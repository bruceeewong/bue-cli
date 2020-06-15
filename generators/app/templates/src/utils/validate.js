/**
 * Validate类: 参数类型校验集合
 * Created by Bruskiwang on 2019/11/01.
 */
export default class Validate {
  /**
   * number类型检测
   * @param {number} num
   * @returns {Boolean}
   */
  static isNumber(num) {
    if (typeof num === 'number' || num instanceof Number) {
      return true
    }
    return false
  }

  /**
   * int类型检测
   * @param {number} num
   * @returns {Boolean}
   */
  static isInt(num) {
    if (this.isNumber(num)) {
      if (!num.toString().includes('.')) {
        return true
      }
    }
    return false
  }

  /**
   * float类型检测
   * @param {number} num
   * @returns {Boolean}
   */
  static isFloat(num) {
    if (this.isNumber(num)) {
      if (num.toString().includes('.')) {
        return true
      }
    }
    return false
  }

  /**
   * @param {string} str
   * @returns {Boolean}
   */
  static isString(str) {
    if (typeof str === 'string' || str instanceof String) {
      return true
    }
    return false
  }

  /**
   * @param {Array} arg
   * @returns {Boolean}
   */
  static isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
  }

  /**
   * 检测Object类型, 这里排除数组与函数
   * @param {Object} obj
   * @returns {Boolean}
   */
  static isObject(obj) {
    if (
      this.isFunction(obj) ||
      this.isArray(obj)
    ) {
      return false
    }
    return obj instanceof Object
  }

  /**
   * @param {static} func
   * @returns {Boolean}
   */
  static isFunction(func) {
    return func instanceof Function
  }

  /**
   * @param {undefined} obj
   * @returns {Boolean}
   */
  static isUndefined(obj) {
    return typeof obj === 'undefined'
  }

  /**
   * @param {null} arg
   * @returns {Boolean}
   */
  static isNull(arg) {
    return Object.prototype.toString.call(arg) === '[object Null]'
  }

  /**
   * @param {Symbol} arg
   * @returns {Boolean}
   */
  static isSymbol(arg) {
    return typeof arg === 'symbol' ||
      Object.prototype.toString.call(arg) === '[object Symbol]'
  }

  /**
 * @param {string} path
 * @returns {Boolean}
 */
  static isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static validUsername(str) {
    const validMap = ['admin', 'editor']
    return validMap.indexOf(str.trim()) >= 0
  }

  /**
 * @param {string} url
 * @returns {Boolean}
 */
  static validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  }

  /**
 * @param {string} str
 * @returns {Boolean}
 */
  static validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
  }

  /**
 * @param {string} email
 * @returns {Boolean}
 */
  static isEmail(email) {
    const reg = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }
}
