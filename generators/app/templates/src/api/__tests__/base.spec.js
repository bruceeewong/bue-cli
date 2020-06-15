import BaseAPI from '../base'

const base = new BaseAPI()

describe('methods: createAxiosInstance', () => {
  it('能够返回axios实例对象', () => {
    expect(typeof base.createAxiosInstance()).toBe('function')
  })
})

describe('methods: trim', () => {
  it('methods: trim, 能将对象中字符为空的,undefined,null的属性删除, 返回结果对象', () => {
    // given
    const testData = {
      key1: 'aaa',
      key2: '',
      key3: undefined,
      key4: null
    }

    // when
    const result = base.trim(testData)

    // then
    expect(result).toEqual({ key1: 'aaa' })
  })

  it('methods: trim, 执行后不影响传入参数', () => {
    // given
    const testData = {
      key1: 'aaa',
      key2: '',
      key3: undefined,
      key4: null
    }
    // when
    base.trim(testData)
    // then
    expect(testData).toEqual({
      key1: 'aaa',
      key2: '',
      key3: undefined,
      key4: null
    })
  })
})
