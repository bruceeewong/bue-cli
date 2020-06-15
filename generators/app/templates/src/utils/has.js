/**
 * 检测对象是否存在某属性
 * @param obj
 * @param property
 * @returns {boolean}
 */
export default function has(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property)
}
