import BaseException from './base-exception'

/**
 * 请求异常类
 */
export default class RequestException extends BaseException {
  type = '请求异常'
}
