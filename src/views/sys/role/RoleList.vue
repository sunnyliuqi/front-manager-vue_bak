<template>
  <a-card :bordered="false">
    <div>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>

      </div>
    </div>
    <s-table
      ref="roleTable"
      size="default"
      :rowKey="(recordActive) => recordActive.id"
      :columns="columns"

      :data="loadData"
      showPagination="false"
    >
      <span slot="status" slot-scope="text">
        {{ getStatusName(text) }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical"/>
          <a @click="handleUpdate(record)">修改</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="您确认删除吗?" @confirm="handleDelete([record])" okText="确认" cancelText="取消">
            <a href="javascript:void(0)">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>
    <detail
      ref="roleDetail"
      :get-status-name="getStatusName"
      :record="recordActive"/>
    <add
      ref="roleAdd"
      :record="recordActive"
      :save="save"
      :refresh="refresh"
    />
    <edit
      ref="roleEdit"
      :record="recordActive"
      :update="update"
      :refresh="refresh"
    />
  </a-card>
</template>

<script>

import { isEmpty } from '@/utils/common'
import { del, get, queryList, save, update } from '@/api/sys/role'
import { STable } from '@/components'
import Detail from './components/Detail'
import Add from './components/Add'
import Edit from './components/Edit'

export default {
  name: 'RoleList',
  components: {
    STable,
    Detail,
    Add,
    Edit
  },
  data () {
    return {
      // 保存方法
      save: save,
      // 修改方法
      update: update,
      // 查询参数
      queryParam: {},
      // 列表表头
      columns: [
        {
          title: '编码',
          dataIndex: 'code',
          key: 'code'
        },
        {
          title: '角色名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'addTime',
          key: 'addTime'
        },
        {
          title: '创建者',
          dataIndex: 'addUserCode',
          key: 'addUserCode'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '320px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return queryList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 10000) {
              return res.result
            }
          })
      },
      // 单个记录行
      recordActive: {}
    }
  },
  created () {
    // 数据字典
  },
  computed: {},
  methods: {

    getStatusName (key) {
      let value = ''
      switch (key) {
        case '0':
          value = '禁用'
          break
        case '1':
          value = '启用'
          break
      }
      return value
    },
    // 重置查询
    restQuery () {
      this.queryParam = {}
      this.$refs.roleTable.refresh(true)
    },
    // 刷新列表
    refresh () {
      this.$refs.roleTable.refresh()
    },
    // 打开详情
    handleDetail (record) {
      get(record).then(res => {
        if (res.code === 10000) {
          this.recordActive = res.result
          this.$refs.roleDetail.show()
        }
      })
    },
    // 打开新增
    handleAdd () {
      this.recordActive = {}
      this.$refs.roleAdd.show()
    },
    // 打开更新
    handleUpdate (record) {
      get(record).then(res => {
        if (res.code === 10000) {
          this.recordActive = res.result
          this.$refs.roleEdit.show()
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
