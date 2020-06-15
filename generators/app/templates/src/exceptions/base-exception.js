/**
 * 自定义异常基类
 *
 * @export
 * @class BaseException
 * @extends {Error}
 */
import Validate from '@/utils/validate'

export default class BaseException extends Error {
  message = 'Error'
  stack = null
  name = 'BaseException'
  type = '未知错误'

  constructor(message, type) {
    super()
    this.setMessage(message)
    if (type) {
      this.setType(type)
    }
    this.stack = (new Error()).stack
    this.name = this.constructor.name
  }

  setMessage(value) {
    if (!Validate.isString(value)) {
      throw new Error('message应为string类型')
    }
    this.message = value
  }
  setType(value) {
    if (!Validate.isString(value)) {
      throw new Error('type应为string类型')
    }
    this.type = value
  }
}
