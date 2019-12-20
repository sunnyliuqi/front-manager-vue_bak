<template>
  <a-drawer
    :maskClosable="false"
    title="新增"
    :width="customWidth"
    @close="onClose"
    :visible="addVisible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            label="菜单名称"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['name',{rules:[{required: true, message: '菜单名称不能为空'}]}]"
              placeholder="请输入菜单名称"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="URL"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['url',{rules:[{required: true, message: 'URL不能为空'}]}]"
              placeholder="请输入URL"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="排序"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['sort',{}]"
              placeholder="请输入排序"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="显示"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select v-decorator="['showFlag',{initialValue:'0',rules:[{required: true, message: '显示不能为空'}]}]" placeholder="请选择显示">
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
              v-decorator="['remark',{}]"
              placeholder="请输入备注"/>
          </a-form-item>
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
import ACol from 'ant-design-vue/es/grid/Col'

export default {
  name: 'MenuAdd',
  components: { ACol },
  props: {
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
    save: {
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
      addVisible: false,
      form: this.$form.createForm(this),
      formLoading: false
    }
  },
  computed: {},
  methods: {
    show () {
      this.addVisible = true
    },
    onClose () {
      this.addVisible = false
      this.formLoading = false
      this.form.resetFields()
    },
    handleSubmit () {
      this.formLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          this.save(values).then(res => {
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
