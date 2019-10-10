// const fs = require('fs')
const process = require('process')
// const utils = require('./utils.js')

// 项目根路径 D:\workspace\framework\front-manager-vue
const bashPath = process.cwd()

// 组件页面位置
const pagesPath = `${bashPath}/src/views`
// api文件位置
const serverPath = `${bashPath}/src/api`
// 路由配置位置
const routerPath = `${bashPath}/config`
// 模板文件位置
// 列表页面
const listTemp = './scripts/generateCode/modules/template/TempList.vue.temp'
// 新增页面
const addTemp = './scripts/generateCode/modules/template/Add.vue.temp'
// 编辑页面
const editTemp = './scripts/generateCode/modules/template/Edit.vue.temp'
// 详情页面
const detailsTemp = './scripts/generateCode/modules/template/Detail.vue.temp'
// api服务
const apiTemp = './scripts/generateCode/modules/template/functionName.js.temp'

/** 列表查询条件**/
let LIST_QUERY_CONDITION
/** 列表查询时间区间参数searchBeginTime: '',searchEndTime: ''**/
let LIST_QUERY_TIME_PARAMS
/* 列表查询时间区间参数赋值
		if (!isEmpty(this.queryParam.enterDate) && Object.keys(this.queryParam.enterDate).length === 2) {
          this.queryParam.searchBeginTime = moment(this.queryParam.enterDate[0]).format('YYYY-MM-DD')
          this.queryParam.searchEndTime = moment(this.queryParam.enterDate[1]).format('YYYY-MM-DD')
        } else {
          this.queryParam.searchBeginTime = ''
          this.queryParam.searchEndTime = ''
        } */
let LIST_QUERY_TIME_SETPARAMS
/** 列表表头**/
let LIST_COLLUMNS
/** 功能名称小写user**/
let FUNCTION_NAME_LOWER
/** 功能名称首字母大写User**/
let FUNCTION_NAME_FIRST_UPPER
/** 父目录 sys **/
let PARENT_ROUTER
/** 服务路径 sys **/
let SERVICE_PATH

/** 编辑内容 **/
let EDIT_CONTENT
/** 详情内容 **/
let DETAIL_CONTENT
/** 新增内容 **/
let ADD_CONTENT

const generateCodeHandle = param => {
  console.info('代码生成-前端-项目根路径为：' + bashPath)
  console.info('代码生成-前端-请求数据为：' + JSON.stringify(param))
  // 1.路由配置文件更新 D:\workspace\framework\front-manager-vue\src\config\router.config.js
  // 2.api服务更新 D:\workspace\framework\front-manager-vue\src\api\index.js
  // 3.api 文件新增 D:\workspace\framework\front-manager-vue\src\api\sys\user.js
  // 4.列表页面 文件新增 D:\workspace\framework\front-manager-vue\src\views\sys\user\UserList.vue
  // 5.详情页面 文件新增 D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Detail.vue
  // 6.新增页面 文件新增D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Add.vue
  // 7.更新页面 文件新增D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Edit.vue
}

module.exports = {
  generateCodeHandle
}
