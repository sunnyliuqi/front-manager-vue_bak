// const fs = require('fs')
const process = require('process')
// const utils = require('./utils.js')

// 项目根路径
const bashPath = process.cwd()

const generateCodeHandle = param => {
  console.info('代码生成-前端-项目根路径为：' + bashPath)
  console.info('代码生成-前端-请求数据为：' + JSON.stringify(param))
}

module.exports = {
  generateCodeHandle
}
