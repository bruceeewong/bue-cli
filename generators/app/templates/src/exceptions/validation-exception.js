import BaseException from './base-exception'

/**
 * 参数校验异常类
 *
 * 适用场景: 参数校验
 */
export default class ValidationException extends BaseException {
  type = '参数校验失败'
}
