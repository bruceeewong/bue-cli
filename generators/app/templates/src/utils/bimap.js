/**
 * 键值双向映射Map
 * 1. 继承ES6 Map所有特性
 * 2. getKey(value) 能根据value找到key
 * 3. 能将键值转为el-option所需格式的数组
 */
export default class BiMap extends Map {
  /**
   * 能根据value找到key
   * @param value
   * @returns {K}
   */
  getKey(value) {
    const entries = this.entries()
    // eslint-disable-next-line no-restricted-syntax
    for (const item of entries) {
      const [key, val] = item
      if (val === value) {
        return key
      }
    }
  }

  /**
   * 将键值转为el-option所需格式的数组
   * @returns {[]}
   */
  suitForSelect() {
    const result = []
    this.forEach((key, value) => {
      result.push({
        label: key,
        value
      })
    })
    return result
  }
}

