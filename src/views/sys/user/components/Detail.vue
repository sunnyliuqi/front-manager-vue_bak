<template>
    <a-drawer
      :maskClosable="false"
      title="详情"
      :width="customWidth"
      @close="onClose"
      :visible="detailVisible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-row :gutter="16">
        <a-col :sm="12" :xs="24">
          <span class="detail-label">员工头像:</span><img  :src="fileDisplayPrefix+record.userHeader" alt="员工头像" height="96" width="96"/>
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">编码:</span>{{ record.userCode }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">工号:</span>{{ record.workNum }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">用户名:</span>{{ record.userName }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">姓名:</span>{{ record.fullName }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">身份证号:</span>{{ record.idNum }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">手机号:</span>{{ record.mobileNum }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">邮箱:</span>{{ record.email }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">所属机构:</span>{{ record.srcOrgName }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">岗位:</span>{{ record.position }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">入职时间:</span>{{ record.entryTime }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">状态:</span>{{ record.enabled ? '正常' : '冻结'}}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">超级管理员:</span>{{ record.adminFlag === '1' ? '是' : '否'}}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">用户角色:</span>{{ record.rolesName }}
        </a-col>
        <a-col :sm="12" :xs="24">
          <span class="detail-label">备注:</span>{{ record.remark }}
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
import { FILE_DISPLAY_PREFIX } from '@/api/upload'
export default {
  name: 'UserDetail',
  props: {
    record: {
      type: [Object, String],
      default: ''
    },
    customWidth: {
      type: [Number],
      default: 720
    }
  },
  data () {
    return {
      fileDisplayPrefix: FILE_DISPLAY_PREFIX,
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
