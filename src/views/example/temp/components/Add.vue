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
            label="编码"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['code',{rules: [ { required: true, message: '编码不能为空' }]}]"
              placeholder="请输入编码"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="name"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['name',{}]"
              placeholder="请输入name"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="状态"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select v-decorator="['status',{} ]" placeholder="请选择状态">
              <a-select-option value="0">不启用</a-select-option>
              <a-select-option value="1">启用</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="年龄"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input-number
              v-decorator="['age',{}]"
              placeholder="请输入年龄"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="自定义"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select v-decorator="['selectCustom',{initialValue:'0',rules:[{required: true, message: '自定义不能为空'}]} ]">
              <a-select-option value="0">无</a-select-option>
              <a-select-option value="1">有</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="数据字典"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select :options="orgType" v-decorator="['selectDict',{}]" placeholder="请选择数据字典下拉框"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="新建日期"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-date-picker
              v-decorator="['addTime',{rules: [ { required: true, message: '新建日期不能为空' }]}]"
              placeholder="请选择新建日期"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="更新时间"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              v-decorator="['updTime',{rules: [ { required: true, message: '更新时间不能为空' }]}]"
              placeholder="请选择更新时间"/>
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
  name: 'TempAdd',
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
    formatDate: {
      type: Function,
      default: undefined
    },
    orgType: {
      type: Array,
      default: function () {
        return {}
      }
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
          values.addTime = this.formatDate(values.addTime, 'YYYY-MM-DD 00:00:00')
          values.updTime = this.formatDate(values.updTime, 'YYYY-MM-DD HH:mm:ss')
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
