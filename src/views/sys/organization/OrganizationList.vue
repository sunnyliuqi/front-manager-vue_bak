<template>
  <a-card :bordered="false">
    <div>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>
      </div>
    </div>
    <s-table
      ref="organizationTable"
      size="default"
      :rowKey="(recordActive) => recordActive.id"
      :columns="columns"
      :data="loadData"
      :expandedRowKeys="expandedKeys"
      :expand="expand"
      showPagination="false"
    >
      <span slot="orgType" slot-scope="text">
        {{ getOrgTypeName(text) }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleUpdate(record)">修改</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="您确认删除吗?" @confirm="handleDelete([record])" okText="确认" cancelText="取消">
            <a href="javascript:void(0)">删除</a>
          </a-popconfirm>
          <a-divider type="vertical"/>
          <a @click="handleAdd(record.id,record.code,true)">添加下级机构</a>
        </template>
      </span>
    </s-table>
    <add
      ref="organizationAdd"
      :check-code="checkCode"
      :options-area="optionsArea"
      :manager-users="managerUsers"
      :tree-data="organizationTreeData"
      :org-type="selectOrgType"
      :record="recordActive"
      :save="save"
      :refresh="refresh"
    />
    <edit
      ref="organizationEdit"
      :check-code="checkCode"
      :options-area="optionsArea"
      :manager-users="managerUsers"
      :tree-data="organizationTreeData"
      :org-type="selectOrgType"
      :record="recordActive"
      :update="update"
      :refresh="refresh"
    />
  </a-card>
</template>

<script>

import { del, get, queryList, save, update, checkCode } from '@/api/sys/organization'
import { getUserAllList } from '@/api/sys/user'
import { listTreeHasCounty } from '@/api/sys/area'
import { getDictByType } from '@/api/common'
import { STable } from '@/components'
import Add from './components/Add'
import Edit from './components/Edit'
/**
 * 格式化树名称为标题
 * @param list
 */
const treeData = list => {
  list.forEach(item => {
    item.title = item.name
    item.value = item.id
    if (item.children) {
      treeData(item.children)
    }
  })
}
export default {
  name: 'OrganizationList',
  components: {
    STable,
    Add,
    Edit
  },
  data () {
    return {
      checkCode: checkCode,
      // 保存方法
      save: save,
      // 修改方法
      update: update,
      // 查询参数
      queryParam: {},
      // 列表表头
      columns: [
        {
          title: '机构名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '机构编码',
          dataIndex: 'code',
          key: 'code'
        },
        {
          title: '机构类型',
          dataIndex: 'orgType',
          key: 'orgType',
          scopedSlots: { customRender: 'orgType' }
        },
        {
          title: '负责人',
          dataIndex: 'fullName',
          key: 'fullName'
        },
        {
          title: '手机号',
          dataIndex: 'mobileNum',
          key: 'mobileNum'
        },
        {
          title: '归属区域',
          dataIndex: 'addressName',
          key: 'addressName'
        },
        {
          title: '详细地址',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '320px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      organizationTreeData: [],
      loadData: parameter => {
        return queryList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 10000) {
              const result = res.result
              treeData(result)
              this.organizationTreeData = result
              /* 默认展开所有 */
              this.expandedKeys = this.renderTree(this.organizationTreeData)
              return this.organizationTreeData
            }
          })
      },
      orgType: [{ label: '全部', value: '' }],
      selectOrgType: [],
      // 单个记录行
      recordActive: {},
      /* 展开行 */
      expandedKeys: [],
      /* 负责人列表 */
      managerUsers: [],
      /* 区域级联 */
      optionsArea: []
    }
  },
  created () {
    getDictByType('org_type').then(
      (res) => {
        if (res.code === 10000) {
          const dnyOrgType = res.result.map(item => {
            return { label: `${item.dictKey}`, value: `${item.dictValue}` }
          })
          this.orgType = [...this.orgType, ...dnyOrgType]
          this.selectOrgType = dnyOrgType
        }
      }
    )
    getUserAllList().then(res => {
      if (res.code === 10000) {
        const _managerUsers = res.result.map(item => {
          return { label: `${item.fullName}`, value: `${item.userCode}` }
        })
        this.managerUsers = [...this.managerUsers, ..._managerUsers]
      }
    })
    listTreeHasCounty().then(res => {
      if (res.code === 10000) {
        this.optionsArea = res.result
      }
    })
  },
  computed: {
  },
  methods: {
    /* 递归拿出id */
    renderTree (organizationTreeData) {
      if (organizationTreeData) {
        const keys = []
        organizationTreeData.forEach(item => {
          keys.push(item.id)
          if (item.children && item.children.length > 0) {
            keys.push(...this.renderTree(item.children))
          }
        })
        return keys
      }
    },
    /* 节点图标点击事件 展开或合并 */
    expand (expanded, record) {
      let _expandedKeys = this.expandedKeys
      if (expanded) {
        _expandedKeys.push(record.id)
      } else {
        _expandedKeys = _expandedKeys.filter(item => {
          return item !== record.id
        })
      }
      this.expandedKeys = _expandedKeys
    },
    getOrgTypeName (key) {
      let value = ''
      this.selectOrgType.forEach(item => {
        if (item.value === key) {
          value = item.label
        }
      })
      return value
    },
    // 重置查询
    restQuery () {
      this.queryParam = {}
      this.$refs.organizationTable.refresh(true)
    },
    // 刷新列表
    refresh () {
      this.$refs.organizationTable.refresh()
    },
    // 打开新增
    handleAdd (supId, supCode, disabled) {
      this.recordActive = { supId: supId || '', supCode: supCode || '', disabled: disabled || false }
      this.$refs.organizationAdd.show()
    },
    // 打开更新
    handleUpdate (record) {
      get(record).then(res => {
        if (res.code === 10000) {
          const result = res.result
          result.srcAreaId = result.srcAreaId ? result.srcAreaId.split(',') : undefined
          this.recordActive = result
          this.$refs.organizationEdit.show()
        }
      })
    },
    // 删除记录
    handleDelete (records) {
      let ids = ''
      records.map(record => {
        ids += record.id + ','
      })
      const param = { id: ids }
      del(param).then(res => {
        if (res.code === 10000) {
          this.$message.info(res.msg)
          this.refresh()
        }
      })
    }
  }
}
</script>
