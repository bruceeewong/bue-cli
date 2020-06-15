import has from '@/utils/has'

it('应该返回 false, 如果指定的对象没有指定的key时', () => {
  const obj = {}
  const key = 'key1'
  expect(has(obj, key)).toBe(false)
})
it('应该返回 true, 如果指定的对象有指定的key时', () => {
  const obj = { key1: 1 }
  const key = 'key1'
  expect(has(obj, key)).toBe(true)
})

