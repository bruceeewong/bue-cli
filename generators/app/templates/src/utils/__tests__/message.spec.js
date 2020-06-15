import Message from '@/utils/message'

describe('static method: error', () => {
  test('如果只传error, 应该返回error的message', () => {
    const errorMessage = '发生了奇怪的错误!'
    const e = new Error(errorMessage)
    expect(Message.error(e)).toEqual(errorMessage)
  })
  test('如果传error和描述，应该返回 "描述: message" 的消息', () => {
    const errorMessage = '发生了奇怪的错误!'
    const errorDesc = '操作失败'
    const e = new Error(errorMessage)
    expect(Message.error(e, errorDesc)).toEqual(`${errorDesc}: ${errorMessage}`)
  })
  test('如果参数为空，应该报错', () => {
    expect(() => {
      Message.error()
    }).toThrow()
  })
})

