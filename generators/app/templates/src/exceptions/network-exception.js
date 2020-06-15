import BaseException from './base-exception'

/**
 * 网络异常类
 *
 * 适用场景: 在axios拦截器中, 出现404/401/500等错误时抛出
 */
export default class NetworkException extends BaseException {
  type = '网络异常'
}
