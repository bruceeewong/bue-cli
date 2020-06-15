// vue filters 管道过滤函数

// 将数字格式化为'1,234,567.89'的格式，支持正负数、小数
// eslint-disable-next-line import/prefer-default-export
export const formatNumber = (num, precision = 2) => {
  const formater = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: precision
  })
  return formater.format(num)
}

// 将数字30.33格式化为'30.33%'的格式
// eslint-disable-next-line import/prefer-default-export
export const percentage = (num) => {
  if (isNaN(Number(num))) {
    return num
  }
  return `${num}%`
}
