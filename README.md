# 前后端分离框架--vue\antd-vue  
## 代码格式化命令  
  ```js-beautify -s 2 -f  service.js  -r service.js```
## 代码规范检查命令  
   ```npm run lint```
## 页面权限控制（必读）
1. 自定义指令（优先推荐）
    > <a-button v-authorize:xxx >查询</a-button> ,其中xxx对应菜单管理里面操作的操作编码
2. v-if方式
    ><a-button v-if="$authorize('xxx')" >查询</a-button>,其中xxx对应菜单管理里面操作的操作编码
3. 去掉菜单路由静态化
    >front-manager-vue\src\config\dynRouter.config.js里面对应菜单设置 static: false
## 跳过全局性错误提示   
> 在接口文件对应的请求中添加headers: { 'check': true }，例如：
```
   export function checkWorkNum (params) {
     return axios({
       url: path.sys + '/user/checkWorkNum',
       method: 'GET',
       // 设置后，业务错误时不会调用弹出全局错误信息
       headers: { 'check': true },
       // id=params.id&workNum=params.workNum
       params: params
     })
   }
```
## 添加必填效果
> 标签添加class="custom-required"  
## 菜单路由静态化（代码生成的默认设置）
> 动态路由配置文件front-manager-vue\src\config\dynRouter.config.js里面设置 static: true
## 日期工具类
> front-manager-vue\src\utils\common.js  
> getMoment 获取当前时间  
> formatDate 日期转字符串  
> offsetMoment 日期偏移  
## 更多文档查看   
> [vue](https://cn.vuejs.org/v2/guide/components.html)  
> [antd-vue UI组件](https://vue.ant.design/)  
> [ant-design-pro-vue 框架](https://github.com/sendya/ant-design-pro-vue)
