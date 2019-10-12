/* eslint-disable no-eval */
// 文件系统
const fs = require('fs')
// 进程
const process = require('process')
// 子进程shell命令函数
const { exec } = require('child_process')

// 项目根路径 D:\workspace\framework\front-manager-vue
const bashPath = process.cwd()

// 组件页面位置
const pagesPath = `${bashPath}/src/views`
// api文件位置
const serverPath = `${bashPath}/src/api`
// 路由配置位置
const routerPath = `${bashPath}/src/config`
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
/** 路由 /sys/user**/
let ROUTER_PARENT

/** 编辑内容 **/
let EDIT_CONTENT
/** 详情内容 **/
let DETAIL_CONTENT
/** 新增内容 **/
let ADD_CONTENT
/**
 *  前端代码生成
 * @param param
 * @returns {string} 返回 {"code":10000,"msg":"处理成功","result":"处理成功"}
 */
const generateCodeHandle = param => {
  let code = 20000
  let msg = '不支持的生成方式'
  console.info('代码生成-前端-项目根路径为：' + bashPath)
  console.info('代码生成-前端-请求数据为：' + JSON.stringify(param))
  // user
  FUNCTION_NAME_LOWER = param.engValue
  // User
  FUNCTION_NAME_FIRST_UPPER = param.engValue.replace(param.engValue[0], param.engValue[0].toUpperCase())
  // /sys
  PARENT_ROUTER = param.parentRouter
  // /sys/user
  ROUTER_PARENT = param.fileUrl
  // 1.路由配置文件更新 D:\workspace\framework\front-manager-vue\src\config\dynRouter.config.js
  // 2.api服务更新 D:\workspace\framework\front-manager-vue\src\api\service.js
  // 3.api 文件新增 D:\workspace\framework\front-manager-vue\src\api\sys\user.js
  // 4.列表页面 文件新增 D:\workspace\framework\front-manager-vue\src\views\sys\user\UserList.vue
  // 5.详情页面 文件新增 D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Detail.vue
  // 6.新增页面 文件新增D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Add.vue
  // 7.更新页面 文件新增D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Edit.vue
  if (param.hasPage === '2') {
  //  只生成路由
    updateRouterConfig(param, 2)
    code = 10000
    msg = '生成路由成功'
  } else if (param.hasPage === '1') {
    SERVICE_PATH = param.serviceName
    LIST_QUERY_CONDITION = ''
    LIST_QUERY_TIME_PARAMS = ''
    LIST_QUERY_TIME_SETPARAMS = ''
    LIST_COLLUMNS = ''
    EDIT_CONTENT = ''
    DETAIL_CONTENT = ''
    ADD_CONTENT = ''
    //  生成页面
    updateRouterConfig(param, 1)
    updateApiService(param)
    createApi(param)
    createList(param)
    createDetail(param)
    createAdd(param)
    createEdit(param)
    code = 10000
    msg = '生成成页面成功'
  }
  const responseMsg = `{"code":${code},"msg":"${msg}","result":"${msg}"}`
  return responseMsg
}

/**
 * 更新路由配置
 * @param param
 * @param number 1表示生成带页面的路由 2表示生成父路由
 */
function updateRouterConfig (param, number) {
  let router
  if (number === 2) {
    // 生成父路由
    router = `{
      path: '${param.fileUrl}',
      component: PageView,
      meta: { title: '${param.chinaValue}' },
      children: []
      }`
  } else {
    router = `{
      path: '${param.fileUrl}',
      name: '${param.engValue}',
      component: () => import('@/views${param.fileUrl}/${FUNCTION_NAME_FIRST_UPPER}List'),
      meta: { title: '${param.chinaValue}', keepAlive: true }
    }`
  }
  fs.readFile(`${routerPath}/dynRouter.config.js`, 'utf8', (err, data) => {
    if (err) throw err
    debugger
    const split = 'dynRouterMap ='
    // 拿到动态路由配置
    const dnyRouterArr = data.split(split)
    console.info(dnyRouterArr[1])
    const dnyRouter = dnyRouterArr[1].replace(/BasicLayout/g, '\'BasicLayout\'').replace(/PageView/g, '\'PageView\'').replace(/\(\) =>.+/g)
    fs.writeFile(`${routerPath}/dynRouter.config.js`, dnyRouter, 'utf8', (err) => {
      if (err) throw err
    })
  })
}
/**
 * 更新api服务
 * @param param
 */
function updateApiService (param) {

}

/**
 * 创建api文件
 * @param param
 */
function createApi (param) {

}

/**
 * 创建list页面
 * @param param
 */
function createList (param) {

}

/**
 * 创建详情页面
 * @param param
 */
function createDetail (param) {

}

/**
 * 创建新增页面
 * @param param
 */
function createAdd (param) {

}

/**
 * 创建编辑页面
 * @param param
 */
function createEdit (param) {

}
module.exports = {
  generateCodeHandle
}
