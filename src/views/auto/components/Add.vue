<template>
  <a-drawer
    :maskClosable="false"
    title="新增"
    :width="'calc(100% - 260px)'"
    @close="onClose"
    :visible="addVisible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item
            label="生成方式"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 10 }">
            <a-radio-group
              v-decorator="['hasPage',{
                initialValue: hasPage,
                rules: [ { required: true }]
              }]"
              @change="radioHasPage"
              buttonStyle="solid" >
              <a-radio-button value="2">只生成路由</a-radio-button>
              <a-radio-button value="1">生成页面</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="hasPage ==='1'">
          <a-form-item
            label="列表样式"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 10 }">
            <a-radio-group
              v-decorator="['tableType',{
                initialValue: tableType
              }]"
              @change="radioTableType"
              buttonStyle="solid" >
              <a-radio-button value="1">基本table</a-radio-button>
              <a-radio-button value="2">带有checkbox</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="hasPage ==='1'">
          <a-form-item
            label="数据库表"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 10 }">
            <a-select
              :options="getTableInfos"
              @change="refreshColumn"
              v-decorator="['tableName',{
                initialValue: ''
              }]"
            >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="路由"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 10 }">
            <a-tree
              showLine
              :treeData="getTreeData"
              @select="addTreeNode"
              v-decorator="['fileUrl',{
                initialValue: routerNode.fileUrl
              }]"
            >
            </a-tree>
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="hasRouterNode">
          <a-form-item
            label="父路由"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 10 }">
            <a-input
              v-decorator="[
                'parentRouter',{initialValue: routerNode.parentRouter}
              ]"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="hasRouterNode">
          <a-form-item
            label="路由"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 10 }">
            <a-input
              v-decorator="[
                'router',{initialValue: routerNode.router}
              ]"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="hasRouterNode">
          <a-form-item
            label="中文名称|标题"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 10 }">
            <a-input
              v-decorator="[
                'chinaValue',{initialValue: routerNode.chinaValue}
              ]"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="hasRouterNode">
          <a-form-item
            label="英文名称|名称"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 10 }">
            <a-input
              v-decorator="[
                'engValue',{initialValue: routerNode.engValue}
              ]"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <add-router
        ref="routerAdd"
        :is-empty="isEmpty"
        :selected-tree-node-key="selectedTreeNodeKey"
        :router-list="routerList"
        @setRouter="setRouter"
      />
      <s-table
        ref="columnInfoTable"
        size="default"
        :rowKey="(record) => record.tableColumn"
        :columns="columns"
        :data="loadData"
        :showPagination="false"
      />
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button
          :style="{marginRight: '8px'}"
          @click="onClose"
        >
          取消
        </a-button>
        <a-button @click="handleSubmit" type="primary" :loading="formLoading">保存</a-button>
      </div>
    </a-form>

  </a-drawer>
</template>

<script>
import AddRouter from './RouterAdd'
import { STable } from '@/components'
export default {
  name: 'AutoAdd',
  props: {
    record: {
      type: Object,
      default: function () {
        return {}
      }
    },
    routerList: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableInfo: {
      type: Function
    },
    isEmpty: {
      type: Function
    },
    tableColumnInfo: {
      type: Function
    },
    refresh: {
      type: Function
    },
    save: {
      type: Function
    },
    checkRouter: {
      type: Function
    }
  },
  components: { AddRouter, STable },
  data () {
    return {
      addVisible: false,
      form: this.$form.createForm(this),
      formLoading: false,
      fileLoading: false,
      // 生成方式,默认只生成路由
      hasPage: '2',
      // 列表样式，默认基本table
      tableType: '1',
      // 数据库表数组
      tableNameList: [],
      // 路由选中的树节点
      selectedTreeNodeKey: '',
      // 是否有新增的路由
      hasRouterNode: false,
      routerNode: {},
      newRouterList: {},
      // 列表表头
      columns: [{
        title: '表字段',
        dataIndex: 'tableColumn',
        key: 'tableColumn'
      }, {
        title: '字段类型',
        dataIndex: 'columnType',
        key: 'columnType'
      }, {
        title: '字段名称',
        dataIndex: 'columnName',
        key: 'columnName',
        editable: true
      }, {
        title: '字段长度',
        dataIndex: 'columnLength',
        key: 'columnLength'
      }, {
        title: '字段精度',
        dataIndex: 'scale',
        key: 'scale'
      }, {
        title: 'java类型',
        dataIndex: 'javaType',
        key: 'javaType'
      }, {
        title: '不可为空',
        dataIndex: 'notNullFlag',
        key: 'notNullFlag'
      }, {
        title: '列表',
        dataIndex: 'listFlag',
        key: 'listFlag'
      }, {
        title: '查询',
        dataIndex: 'queryFlag',
        key: 'queryFlag'
      }, {
        title: '插入',
        dataIndex: 'insertFlag',
        key: 'insertFlag',
        width: 50
      }, {
        title: '编辑',
        dataIndex: 'editFlag',
        key: 'editFlag'
      }, {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort'
      }, {
        title: '查询方式',
        dataIndex: 'queryMode',
        key: 'queryMode'
      }, {
        title: '组件类型',
        dataIndex: 'componentType',
        key: 'componentType'
      }, {
        title: '选项或字典值',
        dataIndex: 'componentData',
        key: 'componentData'
      }],
      // 列表加载数据方法
      tableName: '',
      loadData: parameter => {
        const initData = []
        if (this.isEmpty(this.tableName)) {
          return new Promise(function (resolve) {
            resolve(initData)
          })
        } else {
          return this.tableColumnInfo(this.tableName).then(res => {
            if (res.code === 10000) {
              return res.result
            }
          })
        }
      }
    }
  },
  created () {
    this.tableInfo().then(res => {
      if (res.code === 10000) {
        this.tableNameList = res.result
      }
    })
  },
  computed: {
    // 表列表
    getTableInfos: function () {
      return this.tableNameList.map(item => {
        return { label: item.keyName, value: item.valueName }
      })
    },
    // 路由树
    getTreeData: function () {
      if (!this.isEmpty(this.routerList)) {
        this.loopRouter(this.routerList)
        return this.routerList
      }
      return []
    }
  },
  methods: {
    show () {
      this.addVisible = true
    },
    onClose () {
      this.addVisible = false
      this.hasPage = '2'
      this.tableType = '1'
      this.selectedTreeNodeKey = ''
      this.routerNode = {}
      this.hasRouterNode = false
      this.newRouterList = {}
      this.form.resetFields()
    },
    // 刷新列表
    refreshColumn (value) {
      this.tableName = { 'tableName': value }
      this.$refs.columnInfoTable.refresh()
    },
    // 生成方式
    radioHasPage (e) {
      this.hasPage = e.target.value
    },
    // 列表样式
    radioTableType (e) {
      this.tableType = e.target.value
    },
    // 路由循环列表
    loopRouter (routerList) {
      routerList.filter(item => {
        item.title = item.path
        item.key = item.path
        if (!this.isEmpty(item.children)) {
          this.loopRouter(item.children)
        }
      })
    },
    // 增加路由树
    addTreeNode (keys) {
      if (!this.isEmpty(keys) && !this.isEmpty(keys[0])) {
        this.selectedTreeNodeKey = keys[0]
      }
      this.$refs.routerAdd.show()
    },
    // 设置子路由
    setRouter (routerNode) {
      this.hasRouterNode = true
      this.routerNode = routerNode
      this.newRouterList = JSON.parse(JSON.stringify(this.routerList))
      this.updateRouterList(this.newRouterList, routerNode)
    },
    // 将新增的路由节点放到父级下面
    updateRouterList (routerList, routerNode) {
      let existRouter = false
      for (const item in routerList) {
        if (routerNode.parentRouter === routerList[item].path) {
          const router = {
            path: routerNode.fileUrl,
            name: routerNode.engValue,
            meta: { title: routerNode.chinaValue, keepAlive: true }
          }
          if (this.isEmpty(routerList[item].children)) {
            routerList[item].children = []
          }
          routerList[item].children.push(router)
          existRouter = true
          break
        }
        if (!this.isEmpty(routerList[item].children)) {
          existRouter = this.updateRouterList(routerList[item].children, routerNode)
        }
        if (existRouter) {
          break
        }
      }
    },
    handleSubmit () {
      this.formLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          this.save(values).then(res => {
            if (res.code === 10000) {
              this.$message.info(res.result)
              this.refresh()
            }
          }).finally(() => {
            this.formLoading = false
            this.onClose()
          })
        } else {
          setTimeout(() => {
            this.formLoading = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
