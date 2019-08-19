import path from './index'
import { isEmpty } from '@/utils/common'
// 上传文件地址
export const UPLOAD_URL = path.upload
// 文件回显前缀
export const FILE_DISPLAY_PREFIX = path.uploads

// 解析文件响应
export function parseFileRespon (response) {
  debugger
  if (isEmpty(response) || response.code !== 10000 || response.result.length < 1) {
    this.$message.error(() => {
      return response.msg || '服务异常，请稍后再试'
    })
    return ''
  } else {
    return response.result[0]
  }
}
