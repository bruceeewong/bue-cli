import { formatNumber, percentage } from '../number'

describe('formatNumber', () => {
  test('应该按千分位划分数字', () => {
    expect(formatNumber('12345')).toEqual('12,345')
    expect(formatNumber('12345.111')).toEqual('12,345.11')
    expect(formatNumber('-12345')).toEqual('-12,345')
    expect(formatNumber('-0.55')).toEqual('-0.55')
  })

  test('应该识别number与string类型的输入', () => {
    expect(formatNumber('12345')).toEqual('12,345')
    expect(formatNumber(12345)).toEqual('12,345')
  })
})

describe('percentage', () => {
  test('传递数字类型，可以获得百分号后缀', () => {
    expect(percentage(11)).toEqual('11%')
    expect(percentage('20')).toEqual('20%')
  })
  test('传递非数字型的参数，原样返回', () => {
    expect(percentage('-')).toEqual('-')
    expect(percentage()).toEqual(undefined)
  })
})
