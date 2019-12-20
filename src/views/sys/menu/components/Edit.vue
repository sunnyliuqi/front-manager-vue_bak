<template>
  <a-drawer
    :maskClosable="false"
    :title="title"
    :width="customWidth"
    @close="onClose"
    :visible="editVisible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            label="上级菜单"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-tree-select
              showSearch
              :disabled="record.disabled"
              :treeData="menuTreeData"
              :filterTreeNode="filterTreeNode"
              v-decorator="['supId',{initialValue: record.supId,rules:[{required:true, message:'上级菜单不能为空'}]}]"
              placeholder="请选择上级菜单">
            </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="菜单名称"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['name',{initialValue: record.name,rules:[{required: true, message: '菜单名称不能为空'}]}]"
              placeholder="请输入菜单名称"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="URL"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['url',{initialValue: record.url,rules:[{required: true, message: 'URL不能为空'}]}]"
              placeholder="请输入URL"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="排序"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input-number
              v-decorator="['sort',{initialValue: record.sort || 10000}]"
              placeholder="请输入排序"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="显示"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select
              v-decorator="['showFlag',{initialValue: record.showFlag,rules:[{required: true, message: '显示不能为空'}]}]"
              placeholder="请选择显示">
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="0">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="备注"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['remark',{initialValue: record.remark}]"
              placeholder="请输入备注"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <div class="table-operator" style="margin-bottom: 8px">
            <a-button type="primary" @click="addOperate()">新建操作</a-button>
          </div>
        </a-col>
        <a-col :span="24">
          <s-table
            ref="operatesTable"
            size="default"
            :rowKey="(operate) => operate.id"
            :columns="operateColumns"
            :data="loadData"
            :showPagination="false"
          >
            <span slot="operateName" slot-scope="text, recordChildren">
              <a-input
                class="editTable"
                :value="text"
                @change="e => handleChange({'name': e.target.value}, recordChildren)"
              />
            </span>
            <span slot="operateCode" slot-scope="text, recordChildren">
              <a-input
                class="editTable"
                :value="text"
                @change="e => handleChange({'code': e.target.value}, recordChildren)"
              />
            </span>
            <span slot="customCodeTitle">
              <a-tooltip>
                <template slot="title">
                  对应权限指令v-authorize:xxx、权限属性$authorize('xxx')中的xxx
                </template>
                <Icon type="question-circle" />
            </a-tooltip>
              操作编码
            </span>
            <span slot="operateApis" slot-scope="text, recordChildren">
              <a-select
                mode="multiple"
                showSearch
                optionFilterProp="children"
                :filterOption="filterOption"
                :options="apiList"
                :value="recordChildren.sysApis"
                @change=" value => handleChange({'sysApis':value}, recordChildren)"
              >
              </a-select>
            </span>
            <span slot="operateAction" slot-scope="text, recordChildren">
              <template>
                  <a @click="handleOperateDelete(recordChildren)" >删除</a>
              </template>
            </span>
          </s-table>
        </a-col>
      </a-row>
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
import { STable } from '@/components'
import Icon from 'ant-design-vue/es/icon'
export default {
  name: 'MenuEdit',
  components: { STable, Icon },
  props: {
    menuTreeData: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: String,
      defult: '编辑'
    },
    loadApi: {
      type: Function,
      default: undefined
    },
    isEmpty: {
      type: Function,
      defalut: undefined
    },
    record: {
      type: Object,
      default: function () {
        return {}
      }
    },
    refresh: {
      type: Function,
      default: undefined
    },
    update: {
      type: Function,
      default: undefined
    },
    customWidth: {
      type: Number,
      default: 720
    }
  },
  data () {
    return {
      editVisible: false,
      form: this.$form.createForm(this),
      formLoading: false,
      apiList: [],
      operateColumns: [{
        title: '操作名称',
        dataIndex: 'name',
        width: '300px',
        key: 'name',
        scopedSlots: { customRender: 'operateName' }
      },
      {
        dataIndex: 'code',
        width: '300px',
        key: 'code',
        slots: { title: 'customCodeTitle' },
        scopedSlots: { customRender: 'operateCode' }
      },
      {
        title: 'API',
        dataIndex: 'sysApis',
        key: 'sysApis',
        width: '300px',
        scopedSlots: { customRender: 'operateApis' }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '100px',
        scopedSlots: { customRender: 'operateAction' }
      }],
      operations: [],
      loadData: parameter => {
        let operates = []
        if (!this.isEmpty(this.record) && !this.isEmpty(this.record.operations)) {
          operates = this.record.operations
        }
        return new Promise(function (resolve) {
          resolve(operates)
        }).then(
          res => {
            this.operations = res
            return this.operations
          }
        )
      }
    }
  },
  computed: {
  },
  created () {
    this.loadApi().then(res => {
      if (res.code === 10000) {
        this.apiList = res.result.map(item => {
          return { label: item.name, value: item.id }
        })
      }
    })
  },
  watch: {
    record: function () {
      this.refreshOperatesTable()
    }
  },
  methods: {
    /* api多选下拉框 筛选 */
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    /* 新增操作 */
    addOperate () {
      const newOperate = { 'id': '' + Math.random(), 'code': '', 'name': '', 'menuId': this.record.id, 'sysApis': [] }
      this.operations.push(newOperate)
    },
    // 操作列信息值更新
    handleChange (valueObj, recordChildren) {
      const target = this.operations.filter(item => item.id === recordChildren.id)[0]
      if (!this.isEmpty(target)) {
        Object.assign(target, valueObj)
      }
    },
    /* 操作删除 */
    handleOperateDelete (obj) {
      const index = this.operations.findIndex(item => item.id === obj.id)
      if (index > -1) {
        this.operations.splice(index, 1)
      }
    },
    filterTreeNode (inputValue, treeNode) {
      return treeNode.data.props.title.indexOf(inputValue) > -1
    },
    show () {
      this.editVisible = true
    },
    onClose () {
      this.editVisible = false
      this.form.resetFields()
    },
    /* 刷新操作列表 */
    refreshOperatesTable () {
      if (this.$refs.operatesTable) {
        this.$refs.operatesTable.refresh()
      }
    },
    handleSubmit () {
      this.formLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          values.id = this.record.id
          this.update(values).then(res => {
            if (res.code === 10000) {
              this.$message.info(res.msg)
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
