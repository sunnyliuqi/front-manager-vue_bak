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
              v-decorator="[
                'code',
                {rules: [ { required: true, message: '编码不能为空' }]}
              ]"
              placeholder="请输入编码"/>
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
export default {
  name: 'TempAdd',
  props: {
    record: {
      type: Object,
      default: function () {
        return {}
      }
    },
    customWidth: {
      type: Number,
      default: 720
    },
    refresh: {
      type: Function,
      default: undefined
    },
    save: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      addVisible: false,
      form: this.$form.createForm(this),
      formLoading: false
    }
  },
  computed: {
  },
  methods: {
    show () {
      this.addVisible = true
    },
    onClose () {
      this.addVisible = false
      this.form.resetFields()
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
