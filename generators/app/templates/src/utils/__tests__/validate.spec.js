import Validate from '@/utils/validate.js'

describe('测试 utils/Validate 类', () => {
  test('Validate.validUsername', () => {
    expect(Validate.validUsername('admin')).toBe(true)
    expect(Validate.validUsername('editor')).toBe(true)
    expect(Validate.validUsername('xxxx')).toBe(false)
  })
  test('Validate.isExternal', () => {
    expect(Validate.isExternal('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(Validate.isExternal('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(Validate.isExternal('github.com/PanJiaChen/vue-element-admin')).toBe(false)
    expect(Validate.isExternal('/dashboard')).toBe(false)
    expect(Validate.isExternal('./dashboard')).toBe(false)
    expect(Validate.isExternal('dashboard')).toBe(false)
  })
  test('Validate.isEmail, 测试email格式', () => {
    const trueList = ['mike@qq.com', 'a@qq.edu.com']
    const falseList = ['amyqq.com', 'amy@qq']

    trueList.forEach((item) => {
      expect(Validate.isEmail(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isEmail(item)).toBeFalsy()
    })
  })
  test('Validate.isNumber, 只对数字类型返回true, 其他返回false', () => {
    const trueList = [-1, 0, 1, 2.9, -3.122]
    const falseList = ['a', [], {}, null, undefined, function() {}, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isNumber(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isNumber(item)).toBeFalsy()
    })
  })
  test('Validate.isInt, 只对整数类型返回true, 其他返回false', () => {
    const trueList = [-1, 0, 1, -300, 999]
    const falseList = [1.1, -1.4, 'a', [], {}, null, undefined, function() {}, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isInt(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isInt(item)).toBeFalsy()
    })
  })
  test('Validate.isFloat, 只对浮点数类型返回true, 其他返回false', () => {
    const trueList = [-1.1, 1.55, 2.9, -3.122]
    const falseList = [1, 0, -1, 'a', [], {}, null, undefined, function() {}, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isFloat(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isFloat(item)).toBeFalsy()
    })
  })
  test('Validate.isString, 只对字符数类型返回true, 其他返回false', () => {
    const trueList = ['a', 'ccc']
    const falseList = [1, [], {}, null, undefined, function() {}, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isString(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isString(item)).toBeFalsy()
    })
  })
  test('Validate.isArray, 只对数组数类型返回true, 其他返回false', () => {
    const trueList = [[1, 0], ['a'], [{ key: 1 }]]
    const falseList = [1, 'a', {}, null, undefined, function() {}, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isArray(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isArray(item)).toBeFalsy()
    })
  })
  test('Validate.isFunction, 只对函数类型返回true, 其他返回false', () => {
    const trueList = [function() {}, () => {}]
    const falseList = [1, 'a', [], {}, null, undefined, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isFunction(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isFunction(item)).toBeFalsy()
    })
  })
  test('Validate.isObject, 只对Object类型返回true, 其他返回false', () => {
    const trueList = [{}]
    const falseList = [1, 'a', [], function() {}, () => {}, null, undefined, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isObject(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isObject(item)).toBeFalsy()
    })
  })
  test('Validate.isUndefined, 只对undefined类型返回true, 其他返回false', () => {
    const nothing = undefined
    const trueList = [nothing]
    const falseList = [1, 'a', [], function() {}, () => {}, null, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isUndefined(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isUndefined(item)).toBeFalsy()
    })
  })
  test('Validate.isNull, 只对Null类型返回true, 其他返回false', () => {
    const trueList = [null]
    const falseList = [{}, undefined, 1, 'a', [], function() {}, () => {}, Symbol()]

    trueList.forEach((item) => {
      expect(Validate.isNull(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isNull(item)).toBeFalsy()
    })
  })
  test('Validate.isSymbol, 只对Symbol类型返回true, 其他返回false', () => {
    const trueList = [Symbol()]
    const falseList = [{}, undefined, 1, 'a', [], function() {}, () => {}]

    trueList.forEach((item) => {
      expect(Validate.isSymbol(item)).toBeTruthy()
    })

    falseList.forEach((item) => {
      expect(Validate.isSymbol(item)).toBeFalsy()
    })
  })
})
