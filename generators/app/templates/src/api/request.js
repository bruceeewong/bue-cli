import axios from 'axios'

/**
 * 轻量版的HTTP请求工具，实际上是设置了拦截器和一些基础设置的axios实例
 */

const handleErrorWhileGetResponse = (error) => {
  const codeMessage = {
    400: '发出的请求有错误，请检查参数',
    401: '认证失败',
    403: '权限受限',
    404: '请求的接口不存在，请检查路径',
    405: '请求的方法不允许',
    406: '请求的格式不可得',
    410: '请求的资源被永久删除',
    422: '服务器无法处理请求的实体',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误，请检查服务器配置',
    503: '服务不可用，服务器暂时过载或维护中',
    504: '网关超时，请检查服务器'
  }
  const { status, statusText } = error.response
  return codeMessage[status] || statusText
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
// service.interceptors.request.use(
//   (config) => {},
//   (error) => {}
// );

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (error) => {
    let errorMessage = ''
    if (error.response) {
      // 请求发出, 得到响应, 但 HTTP status 超过 2xx
      errorMessage = handleErrorWhileGetResponse(error)
    } else if (error.request) {
      // 请求发出, 但无响应
      errorMessage = '连接服务器失败'
    } else {
      // 设置请求过程中发生未知错误
      errorMessage = error.message
    }
    return Promise.reject(new Error(errorMessage))
  }
)

export default service
