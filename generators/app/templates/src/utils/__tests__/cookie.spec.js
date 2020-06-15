import Cookie from '@/utils/cookie.js'

beforeEach(() => {
  // 每个测试用例运行前, 清空cookie
  document.cookie = 'myKey=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
})

describe('测试 utils/Cookie 类', () => {
  test('Cookie.set 传入字符类型的key, value, 可以种下cookie', () => {
    Cookie.set('myKey', 'myValue')
    expect(document.cookie).toMatch('myKey=myValue')
  })

  test('Cookie.get 传入不存在的key时, 返回undefined', () => {
    expect(Cookie.get('nothing')).toBe(undefined)
  })

  test('Cookie.get 传入存在的key时, 返回对应的值', () => {
    document.cookie = 'myKey=myValue'
    expect(Cookie.get('myKey')).toBe('myValue')
  })

  test('Cookie.get 传入非String类型的key时, 抛出错误', () => {
    expect(() => {
      Cookie.get(11111)
    })
      .toThrow()
  })
  test('Cookie.set 传入非String类型的key时, 抛出错误', () => {
    expect(() => {
      Cookie.set(11111, 'value')
    })
      .toThrow()
  })
  test('Cookie.remove 传入非String类型的key时, 抛出错误', () => {
    expect(() => {
      Cookie.remove(11111)
    })
      .toThrow()
  })
})
