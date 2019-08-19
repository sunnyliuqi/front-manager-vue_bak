/**
 * 判断是否为空
 * @param o
 * @returns {boolean}
 */
export function isEmpty (o) {
  switch (typeof (o)) {
    case 'undefined':
      return true
    case 'function':
      return false
    case 'boolean':
      return false
    case 'number':
      return false
    case 'object':
      if (typeof (o.length) === 'undefined') {
        return false
      } else {
        return Object.keys(o).length === 0
      }
    default:
      return Object.keys(o).length === 0
  }
}
