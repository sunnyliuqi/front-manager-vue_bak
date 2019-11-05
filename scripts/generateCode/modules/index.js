/* eslint-disable no-eval */
// 文件系统
const fs = require('fs')
// 进程
const process = require('process')
// 子进程shell命令函数
const { exec } = require('child_process')

// 项目根路径 D:\workspace\framework\front-manager-vue
const bashPath = process.cwd()

// 字符编码
const character = 'utf8'

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
let LIST_COLUMNS
/** 功能名称小写user**/
let FUNCTION_NAME_LOWER
/** 功能名称首字母大写User**/
let FUNCTION_NAME_FIRST_UPPER
/** 父目录 sys **/
let PARENT_ROUTER
/** 服务路径 sys **/
let SERVICE_PATH
/** 全路由 /sys/user**/
let FULL_ROUTER

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
  FUNCTION_NAME_LOWER = param.router.substring(1)
  // User
  FUNCTION_NAME_FIRST_UPPER = FUNCTION_NAME_LOWER.replace(FUNCTION_NAME_LOWER[0], FUNCTION_NAME_LOWER[0].toUpperCase())
  // /sys
  PARENT_ROUTER = param.parentRouter
  // /sys/user
  FULL_ROUTER = param.fileUrl

  /* 1.路由配置文件更新 D:\workspace\framework\front-manager-vue\src\config\dynRouter.config.js
  2.api服务更新 D:\workspace\framework\front-manager-vue\src\api\service.js
  3.api 文件新增 D:\workspace\framework\front-manager-vue\src\api\sys\user.js
  4.列表页面 文件新增 D:\workspace\framework\front-manager-vue\src\views\sys\user\UserList.vue
  5.详情页面 文件新增 D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Detail.vue
  6.新增页面 文件新增D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Add.vue
  7.更新页面 文件新增D:\workspace\framework\front-manager-vue\src\views\sys\user\components\Edit.vue
  */
  if (param.hasPage === '2') {
    //  只生成路由
    updateRouterConfig(param, 2)
    code = 10000
    msg = '生成路由成功'
  } else if (param.hasPage === '1') {
    SERVICE_PATH = param.serviceName.match(/(.*):/)[1]
    LIST_QUERY_CONDITION = getQueryCondition(param)
    LIST_QUERY_TIME_PARAMS = getQueryTime(param)
    LIST_QUERY_TIME_SETPARAMS = getQuerySetTime(param)
    LIST_COLUMNS = getColumns(param)
    EDIT_CONTENT = getEdit(param)
    DETAIL_CONTENT = getDetail(param)
    ADD_CONTENT = getAdd(param)
    //  生成页面
    updateRouterConfig(param, 1)
    updateApiService(param)
    createApi(param)
    // createList(param)
    // createDetail(param)
    // createAdd(param)
    // createEdit(param)
    code = 10000
    msg = '生成页面成功'
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
      meta: { title: '${param.chinaValue}', static: true },
      children: []
      }`
  } else {
    router = `{
      path: '${param.fileUrl}',
      name: '${param.engValue}',
      component: () => import('@/views${param.fileUrl}/${FUNCTION_NAME_FIRST_UPPER}List'),
      meta: { title: '${param.chinaValue}', keepAlive: true, static: true }
    }`
  }
  const filePath = `${routerPath}/dynRouter.config.js`
  fs.readFile(filePath, character, (err, data) => {
    if (err) console.error(JSON.stringify(err))
    const split = 'dynRouterMap ='
    // 拿到动态路由配置
    const dnyRouterArr = data.split(split)
    const dnyRouter = replaceError(dnyRouterArr[1])
    console.info(dnyRouter)
    const dnyRouterObj = eval('(' + dnyRouter + ')')
    const routerObj = eval('(' + replaceError(router) + ')')
    // 将当前路由添加到路由配置里面
    setRouterToConfig(dnyRouterObj, routerObj)
    const dnyRouterJson = JSON.stringify(dnyRouterObj)
    const newRouterConfig = dnyRouterArr[0] + split + '\n' + reReplaceError(dnyRouterJson)
    fs.writeFile(filePath, newRouterConfig, character, (err) => {
      if (err) console.error(JSON.stringify(err))
      //  格式化代码
      formatJsonCode(filePath)
      // 代码规范修复
      formatCode(filePath)
    })
  })
}

function setRouterToConfig (dnyRouterObj, router) {
  dnyRouterObj.forEach(item => {
    if (item.path === PARENT_ROUTER) {
      if (!item.children) {
        item.children = []
      }
      item.children.push(router)
    } else {
      if (item.children && item.children.length) {
        setRouterToConfig(item.children, router)
      }
    }
  })
  return dnyRouterObj
}

/**
 * 更新api服务
 * @param param
 */
function updateApiService (param) {
  const filePath = `${serverPath}/service.js`
  fs.readFile(filePath, character, (err, data) => {
    if (err) console.error(JSON.stringify(err))
    // 拿到服务配置
    const serviceConfigObj = eval('(' + data.replace('export const service =', '') + ')')
    const serviceInfo = param.serviceName.split(':')
    if (!serviceInfo || serviceInfo.length < 2) {
      console.error('服务格式错误：' + param.serviceName)
    }
    const servicePro = {}
    servicePro[serviceInfo[0]] = serviceInfo[1].replace(/'/g, '').trim()
    const newData = 'export const service = ' + JSON.stringify(Object.assign(serviceConfigObj, servicePro)).replace(/"[A-Za-z].+?"/g, ($1) => {
      return $1.substring(1, ($1.length - 1))
    })
    fs.writeFile(filePath, newData, character, (err) => {
      if (err) console.error(JSON.stringify(err))
      //  格式化代码
      formatJsonCode(filePath)
      // 代码规范修复
      formatCode(filePath)
    })
  })
}

/**
 * 创建api文件
 * @param param
 */
function createApi (param) {
  fs.readFile(apiTemp, character, (err, data) => {
    if (err) console.error(JSON.stringify(err))
    const dir = `${serverPath}${PARENT_ROUTER}`.replace(/\\/g, '/')
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) console.error(JSON.stringify(err))
      data = data
        .replace(/#{SERVICE_PATH}/g, SERVICE_PATH)
        .replace(/#{FULL_ROUTER}/g, FULL_ROUTER)
      const filePath = `${dir}/${FUNCTION_NAME_LOWER}.js`
      fs.writeFile(filePath, data, character, (err) => {
        if (err) console.error(JSON.stringify(err))
        //  格式化代码
        formatJsonCode(filePath)
        // 代码规范修复
        formatCode(filePath)
      })
    })
  })
}

/**
 * 创建list页面
 * @param param
 */
function createList (param) {
  fs.readFile(listTemp, character, (err, data) => {
    if (err) console.error(JSON.stringify(err))
    const dir = `${pagesPath}${FULL_ROUTER}`.replace(/\\/g, '/')
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) console.error(JSON.stringify(err))
      const filePath = `${dir}/${FUNCTION_NAME_FIRST_UPPER}List.vue`
      fs.writeFile(filePath, replaceContent(data), character, (err) => {
        if (err) console.error(JSON.stringify(err))
        // 代码规范修复
        formatCode(filePath)
      })
    })
  })
}

/**
 * 创建详情页面
 * @param param
 */
function createDetail (param) {
  fs.readFile(detailsTemp, character, (err, data) => {
    if (err) console.error(JSON.stringify(err))
    const dir = `${pagesPath}${FULL_ROUTER}/components`.replace(/\\/g, '/')
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) console.error(JSON.stringify(err))
      const filePath = `${dir}/Detail.vue`
      fs.writeFile(filePath, replaceContent(data), character, (err) => {
        if (err) console.error(JSON.stringify(err))
        // 代码规范修复
        formatCode(filePath)
      })
    })
  })
}

/**
 * 创建新增页面
 * @param param
 */
function createAdd (param) {
  fs.readFile(addTemp, character, (err, data) => {
    if (err) console.error(JSON.stringify(err))
    const dir = `${pagesPath}${FULL_ROUTER}/components`.replace(/\\/g, '/')
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) console.error(JSON.stringify(err))
      const filePath = `${dir}/Add.vue`
      fs.writeFile(filePath, replaceContent(data), character, (err) => {
        if (err) console.error(JSON.stringify(err))
        // 代码规范修复
        formatCode(filePath)
      })
    })
  })
}

/**
 * 创建编辑页面
 * @param param
 */
function createEdit (param) {
  fs.readFile(editTemp, character, (err, data) => {
    if (err) console.error(JSON.stringify(err))
    const dir = `${pagesPath}${FULL_ROUTER}/components`.replace(/\\/g, '/')
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) console.error(JSON.stringify(err))
      const filePath = `${dir}/Edit.vue`
      fs.writeFile(filePath, replaceContent(data), character, (err) => {
        if (err) console.error(JSON.stringify(err))
        // 代码规范修复
        formatCode(filePath)
      })
    })
  })
}

/**
 *<a-col :md="8" :sm="12" :xs="24">
 <a-form-item label="用户名">
 <a-input v-model="queryParam.userName" placeholder="请输入用户名"/>
 </a-form-item>
 </a-col>
 * @param param
 * @returns {string}
 */
function getQueryCondition (param) {
  const tableInfo = param.tableInfo
  const temp = []
  tableInfo.forEach(column => {
    if (column.queryFlag) {
      let aFromItem = ''
      if (column.componentType === 'InputNumber') {
        aFromItem = `<a-form-item label="${column.columnName}">
          <a-input-number v-model="queryParam.${column.tableColumn}" placeholder="请输入${column.columnName}"/>
        </a-form-item>`
      } else if (column.componentType === 'Select') {
        const selectOptions = column.componentData.split(';')
        if (selectOptions.length < 1) {
          // 数据字典
          aFromItem = ``
        } else {
          const selectOpt = []
          selectOptions.forEach(opt => {
            const opts = opt.split(':')
            if (typeof (opts) === 'object' && opts.length === 2) {
              selectOpt.push(`<a-select-option value="${opts[0]}">${opts[1]}</a-select-option>`)
            }
          })
          // 自定义
          aFromItem = `<a-form-item label="${column.columnName}">
                <a-select v-model="queryParam.${column.tableColumn}" placeholder="请选择${column.columnName}">
                  <a-select-option value="">全部</a-select-option>
                  ${selectOpt.join('')}
                </a-select>
              </a-form-item>`
        }
      } else if (column.componentType === 'DatePicker_date') {
        aFromItem = `<a-form-item
                label="${column.columnName}">
                <a-range-picker v-model="queryParam.${column.tableColumn}"/>
              </a-form-item>`
      } else if (column.componentType === 'DatePicker_datetime') {
        aFromItem = `<a-form-item
                label="${column.columnName}">
                <a-range-picker showTime format="YYYY/MM/DD HH:mm:ss" v-model="queryParam.${column.tableColumn}"/>
              </a-form-item>`
      } else {
        // Input
        aFromItem = `<a-form-item label="${column.columnName}">
          <a-input v-model="queryParam.${column.tableColumn}" placeholder="请输入${column.columnName}"/>
        </a-form-item>`
      }
      temp.push(`<a-col :md="8" :sm="12" :xs="24">
 ${aFromItem}
 </a-col>
`)
    }
  })
  return temp.join('')
}

/**
 *searchBeginTime: '',
 searchEndTime: ''
 * @param param
 * @returns {string}
 */
function getQueryTime (param) {
  const temp = []
  return temp.join('')
}

/**
 *if (!isEmpty(this.queryParam.enterDate) && Object.keys(this.queryParam.enterDate).length === 2) {
          this.queryParam.searchBeginTime = moment(this.queryParam.enterDate[0]).format('YYYY-MM-DD')
         this.queryParam.searchEndTime = moment(this.queryParam.enterDate[1]).format('YYYY-MM-DD')
        } else {
          this.queryParam.searchBeginTime = ''
          this.queryParam.searchEndTime = ''
        }
 * @param param
 * @returns {string}
 */
function getQuerySetTime (param) {
  const temp = []
  return temp.join('')
}

/**
 * [
 {
          title: '编码',
          dataIndex: 'userCode',
          key: 'userCode'
        }, {
          title: '用户名',
          dataIndex: 'userName',
          key: 'userName'
        },
 {
          title: '操作',
          dataIndex: 'action',
          width: '320px',
          scopedSlots: { customRender: 'action' }
        }
 ]
 * @param param
 * @returns {string}
 */
function getColumns (param) {
  const temp = []
  return temp.join('')
}

/**
 * <a-col :span="12">
 <a-form-item
 label="工号"
 :labelCol="{ span: 8 }"
 :wrapperCol="{ span: 16 }">
 <a-input
 v-decorator="[
 'workNum',
 {
                  initialValue: record.workNum,
                  rules: [ { required: true, message: '工号不能为空' }]
                }
 ]"
 placeholder="请输入工号"/>
 </a-form-item>
 </a-col>
 * @param param
 * @returns {string}
 */
function getEdit (param) {
  const temp = []
  return temp.join('')
}

/**
 * <a-col :sm="12" :xs="24">
 <span class="detail-label">编码:</span>{{ record.userCode }}
 </a-col>
 * @param param
 * @returns {string}
 */
function getDetail (param) {
  const temp = []
  return temp.join('')
}

/**
 * <a-col :span="12">
 <a-form-item
 label="工号"
 :labelCol="{ span: 8 }"
 :wrapperCol="{ span: 16 }">
 <a-input
 v-decorator="[
 'workNum',
 {rules: [ { required: true, message: '工号不能为空' }]}
 ]"
 placeholder="请输入工号"/>
 </a-form-item>
 </a-col>
 * @param param
 * @returns {string}
 */
function getAdd (param) {
  const temp = []
  return temp.join('')
}
/**
 * 业务模板内容替换
 * @param data
 * @returns {*}
 */
function replaceContent (data) {
  return data
    .replace(/#{LIST_QUERY_CONDITION}/g, LIST_QUERY_CONDITION)
    .replace(/#{LIST_QUERY_TIME_PARAMS}/g, LIST_QUERY_TIME_PARAMS)
    .replace(/#{LIST_QUERY_TIME_SETPARAMS}/g, LIST_QUERY_TIME_SETPARAMS)
    .replace(/#{LIST_COLUMNS}/g, LIST_COLUMNS)
    .replace(/#{FUNCTION_NAME_LOWER}/g, FUNCTION_NAME_LOWER)
    .replace(/#{FUNCTION_NAME_FIRST_UPPER}/g, FUNCTION_NAME_FIRST_UPPER)
    .replace(/#{PARENT_ROUTER}/g, PARENT_ROUTER)
    .replace(/#{SERVICE_PATH}/g, SERVICE_PATH)
    .replace(/#{EDIT_CONTENT}/g, EDIT_CONTENT)
    .replace(/#{DETAIL_CONTENT}/g, DETAIL_CONTENT)
    .replace(/#{ADD_CONTENT}/g, ADD_CONTENT)
}
function replaceError (string) {
  return string
    .replace(/BasicLayout/g, '\'BasicLayout\'')
    .replace(/PageView/g, '\'PageView\'')
    .replace(/RouteView/g, '\'RouteView\'')
    .replace(/PagUserLayouteView/g, '\'UserLayout\'')
    .replace(/BlankLayout/g, '\'BlankLayout\'')
    .replace(/\(\) =>.+?\)/g, ($1) => {
      return '"' + $1 + '"'
    })
}

function reReplaceError (string) {
  return string
    .replace(/"BasicLayout"/g, 'BasicLayout')
    .replace(/"PageView"/g, 'PageView')
    .replace(/"RouteView"/g, 'RouteView')
    .replace(/"UserLayout"/g, 'UserLayout')
    .replace(/"BlankLayout"/g, 'BlankLayout')
    .replace(/"path":/g, 'path:')
    .replace(/"component":/g, 'component:')
    .replace(/"meta":/g, 'meta:')
    .replace(/"name":/g, 'name:')
    .replace(/"title":/g, 'title:')
    .replace(/"static":/g, 'static:')
    .replace(/"redirect":/g, 'redirect:')
    .replace(/"children":/g, 'children:')
    .replace(/"keepAlive":/g, 'keepAlive:')
    .replace(/"hidden":/g, 'hidden:')
    .replace(/"\(\) =>.*?\)"/g, ($1) => {
      return $1.substring(1, ($1.length - 1))
    })
}

/**
 * 代码格式化 Json 代码
 * @param command 命令
 */
const formatJsonCode = path => {
  const execCommand = `js-beautify -s 2 -f  ${path} -r ${path}`
  exec(execCommand, function (err, stdout, stderr) {
    if (err) console.error(JSON.stringify(err))
  })
}
/**
 * 代码规范修复
 * @param command 命令
 */
const formatCode = fullpath => {
  const execCommand = `eslint --fix ${fullpath}`
  exec(execCommand, function (err, stdout, stderr) {
    if (err) console.error(JSON.stringify(err))
  })
}
module.exports = {
  generateCodeHandle
}
