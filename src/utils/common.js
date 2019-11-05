import moment from 'moment'

/**
 * 获取moment
 * @param date
 * @param format
 * @returns {*}
 */
export function getMoment (date, format) {
  if (isEmpty(date)) {
    return null
  } else {
    return moment(date, format)
  }
}
/**
 * 时间格式化
 * @param date
 * @param fromat
 * 返回字符串
 */
export function formatDate (date, format) {
  if (isEmpty(date)) {
    return ''
  } else {
    return moment(date).format(format)
  }
}
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
