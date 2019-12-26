import moment from 'moment'

/**
 * 获取moment
 * @param date
 * @param format
 * @returns {*}
 */
export function getMoment (date, format) {
  if (isEmpty(format)) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  if (isEmpty(date)) {
    return moment(new Date(), format)
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
  if (isEmpty(format)) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  if (isEmpty(date)) {
    return ''
  } else {
    return moment(date).format(format)
  }
}

/**
 * 时间偏移
 * @param date 时间
 * @param format 格式化
 * @param type 偏移类型 'year' 'month' 'week' 'day' 'hour' 'minute' 'second'
 * @param offset 偏移量
 */
export function offsetMoment (date, format, type, offset) {
  if (isEmpty(date)) {
    date = new Date()
  }
  if (isEmpty(format)) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  return moment(moment(date).add(offset, type), format)
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
