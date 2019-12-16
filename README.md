# 前后端分离框架--vue\antd-vue  
## 代码格式化命令  
  ```js-beautify -s 2 -f  service.js  -r service.js```
## 代码规范检查命令  
   ```npm run lint```
## 页面权限控制
1. 自定义指令（优先推荐）
    > <a-button v-authorize:xxx >查询</a-button> ,其中xxx对应菜单管理里面操作的操作编码
2. v-if方式
    ><a-button v-if="$authorize('xxx')" >查询</a-button>,其中xxx对应菜单管理里面操作的操作编码
   
> 更多查看   
> [vue](https://cn.vuejs.org/v2/guide/components.html)  
> [antd-vue UI组件](https://vue.ant.design/)  
> [ant-design-pro-vue 框架](https://github.com/sendya/ant-design-pro-vue)
