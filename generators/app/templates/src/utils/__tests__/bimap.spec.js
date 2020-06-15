import BiMap from '../bimap'

it('should get a Map type object', () => {
  const biMap = new BiMap()
  expect(biMap instanceof Map).toBeTruthy()
})
it('should get key by input value', () => {
  const biMap = new BiMap()
  biMap.set('key', 'aaaaaa')
  expect(biMap.getKey('aaaaaa')).toEqual('key')
})
it('should get array that contain object with key "label" & "value")', () => {
  const biMap = new BiMap()
  biMap.set(1, 'somestring')
  const result = biMap.suitForSelect()
  expect(Array.isArray(result)).toBeTruthy()
  expect(result[0]).toEqual({ label: 'somestring', value: 1 })
})
