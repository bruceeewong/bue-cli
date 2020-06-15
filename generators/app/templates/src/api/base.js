import axios from 'axios'
import Validate from '@/utils/validate'
import ValidationException from '@/exceptions/validation-exception'
import NetworkException from '@/exceptions/network-exception'
import RequestException from '../exceptions/request-exception'

/**
 * API基类
 */
export default class Base {
  prefix = ''
  axiosIns = null

  constructor(prefix = '') {
    this.prefix = prefix
    this.axiosIns = this.createAxiosInstance()
  }

  /**
   * 生成Axios实例, 自定义配置如下:
   * 1. 根据环境,配置不同baseURL
   * 2. 统一设置超时时间
   * 3. 设置请求拦截器
   * 4. 设置响应拦截器
   * @returns {object}
   */
  createAxiosInstance() {
    // 创建axiosIns实例, 具有根据环境不同, 加载.env.xxx文件中的请求前缀
    const instance = axios.create({
      baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
      timeout: 60 * 1000, // 请求超时时间
      withCredentials: true // 跨域请求时携带cookie
    })

    // 设置请求拦截器
    instance.interceptors.request.use(
      config => config,
      error => Promise.reject(new RequestException(error))
    )

    // 设置响应拦截器
    instance.interceptors.response.use(
      (response) => {
        const { data } = response
        return data
      },
      (error) => {
        // 针对不同的请求错误，抛出对应的消息异常，交由全局错误处理
        let errorMessage = ''
        if (error.response) {
          // 请求发出, 得到响应, 但 HTTP status 超过 2xx
          errorMessage = this.handleErrorWhileGetResponse(error)
        } else if (error.request) {
          // 请求发出, 但无响应
          errorMessage = '连接服务器失败'
        } else {
          // 设置请求过程中发生未知错误
          errorMessage = error.message
        }
        return Promise.reject(new NetworkException(errorMessage))
      }
    )
    return instance
  }

  /**
   * HTTP请求函数
   * 参数opts形如, 与axios官方使用方法一致
   * 如果传入了校验Joi schema, 会自动执行校验
   *
   * @param {object} opts
   * @param {object} responseSchema
   * @returns {Promise}
   * @throws
   */
  async request(opts, responseSchema = null) {
    if (!responseSchema) {
      return this.axiosIns(opts)
    }
    const response = await this.axiosIns(opts)
    return this.validate(responseSchema, response)
  }

  /**
   * 根据传入的Joi schema验证传入的data
   * 成功: 返回通过验证的数据
   * 失败: 抛出错误
   *
   * @param {object} schema
   * @param {*} data
   * @returns
   */
  validate(schema, data) {
    const { error, value } = schema.validate(data)
    if (error) {
      throw new ValidationException(error.message)
    }
    return value
  }

  /**
   * 删去字符类型为空,为undefined,为null的属性
   * 适用于除去空的query参数
   *
   * @param {object} params
   * @returns {object}
   */
  trim(params) {
    const copyParams = { ...params }
    Object.entries(copyParams)
      .forEach((item) => {
        const [key, value] = item
        if ((Validate.isString(value) && value.trim() === '') ||
          Validate.isUndefined(value) ||
          Validate.isNull(value)
        ) {
          delete copyParams[key]
        }
      })
    return copyParams
  }

  /**
   * 处理请求得到响应时的错误情况, 返回错误信息
   * @param error
   * @returns {string}
   */
  handleErrorWhileGetResponse(error) {
    const codeMessage = {
      400: '发出的请求有错误，请检查参数。',
      401: '认证失败。',
      403: '权限受限。',
      404: '请求的接口不存在，请检查路径。',
      405: '请求的方法不允许。',
      406: '请求的格式不可得。',
      410: '请求的资源被永久删除。',
      422: '服务器无法处理请求的实体。',
      500: '服务器发生错误，请检查服务器。',
      502: '网关错误，请检查服务器配置。',
      503: '服务不可用，服务器暂时过载或维护中。',
      504: '网关超时，请检查服务器。'
    }
    const { status, statusText } = error.response
    return codeMessage[status] || statusText
  }
}
