<template>
  <a-drawer
    title="详情"
    :width="customWidth"
    @close="onClose"
    :visible="detailVisible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-row :gutter="16">
      <a-col :sm="12" :xs="24">
        <span class="detail-label">编码:</span>{{ record.code }}
      </a-col>
      <a-col :sm="12" :xs="24">
        <span class="detail-label">name:</span>{{ record.name }}
      </a-col>
      <a-col :sm="12" :xs="24">
        <span class="detail-label">状态:</span>{{ getStatusName(record.status) }}
      </a-col>
      <a-col :sm="12" :xs="24">
        <span class="detail-label">年龄:</span>{{ record.age }}
      </a-col>
      <a-col :sm="12" :xs="24">
        <span class="detail-label">自定义:</span>{{ getCustomName(record.selectCustom) }}
      </a-col>
      <a-col :sm="12" :xs="24">
        <span class="detail-label">数据字典:</span>{{ record.selectDict }}
      </a-col>
      <a-col :sm="12" :xs="24">
        <span class="detail-label">新建日期:</span>{{ formatDate(record.addTime,'YYYY-MM-DD') }}
      </a-col>
      <a-col :sm="12" :xs="24">
        <span class="detail-label">更新时间:</span>{{ formatDate(record.updTime,'YYYY-MM-DD HH:mm:ss') }}
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
  name: 'TempDetail',
  props: {
    record: {
      type: [Object, String],
      default: ''
    },
    customWidth: {
      type: Number,
      default: 720
    },
    formatDate: {
      type: Function,
      default: undefined
    },
    getStatusName: {
      type: Function,
      default: undefined
    },
    getCustomName: {
      type: Function,
      default: undefined
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
