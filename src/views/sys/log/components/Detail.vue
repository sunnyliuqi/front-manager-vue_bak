<template>
  <a-drawer
    title="详情"
    :width="customWidth"
    @close="onClose"
    :visible="detailVisible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-row :gutter="16">
      <a-col :sm="24" :xs="24">
        <span class="detail-label">操作人:</span>{{ record.operationPerson }}
      </a-col>
      <a-col :sm="24" :xs="24">
        <span class="detail-label">api请求数据:</span>{{ record.requestData }}
      </a-col>
      <a-col :sm="24" :xs="24">
        <span class="detail-label">API名称:</span>{{ record.name }}
      </a-col>
      <a-col :sm="24" :xs="24">
        <span class="detail-label">api响应数据:</span>{{ record.responseData }}
      </a-col>
      <a-col :sm="24" :xs="24">
        <span class="detail-label">路径:</span>{{ record.path }}
      </a-col>
      <a-col :sm="24" :xs="24">
        <span class="detail-label">请求方法,putgetpostdelete:</span>{{ record.requestMethod }}
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
        返回
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
export default {
  name: 'LogDetail',
  props: {
    record: {
      type: [Object, String],
      default: ''
    },
    formatDate: {
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
      detailVisible: false
    }
  },
  methods: {
    show () {
      this.detailVisible = true
    },
    onClose () {
      this.detailVisible = false
    }
  }
}
</script>

<style scoped>

</style>
