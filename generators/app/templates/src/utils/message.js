import { Message as ElMessage } from 'element-ui'
import Validate from '@/utils/validate.js'

class Message {
  /**
   * 界面显示错误, 并在调试面板打印错误详情
   *
   * @static
   * @param {string} desc
   * @param {Error} err
   * @memberof Message
   */
  static error(err, desc = '') {
    if (!err && !desc) {
      throw new Error('参数缺失')
    }
    if (!(err instanceof Error) ||
      !Validate.isString(desc)) {
      throw new Error('参数不合法')
    }

    let errorMessage = ''
    if (err instanceof Error) {
      errorMessage = err.message
      if (desc !== '') {
        errorMessage = `${desc}: ${errorMessage}`
      }
    } else {
      errorMessage = desc
    }

    // eslint-disable-next-line new-cap
    ElMessage({
      type: 'error',
      message: errorMessage
    })

    return errorMessage
  }

  static success(msg = '') {
    // eslint-disable-next-line new-cap
    ElMessage({
      type: 'success',
      message: msg
    })
    return msg
  }

  static info(msg) {
    // eslint-disable-next-line new-cap
    ElMessage({
      type: 'info',
      message: msg
    })
    return msg
  }
}

export default Message
