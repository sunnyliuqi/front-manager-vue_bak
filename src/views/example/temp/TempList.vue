<template>
  <a-card :bordered="false">
    <div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="编码">
                <a-input v-model="queryParam.code" placeholder="请输入编码"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="name">
                <a-input v-model="queryParam.name" placeholder="请输入name"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item
                label="创建时间">
                <a-range-picker v-model="queryParam.addTimeSearch"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item
                label="更新时间">
                <a-range-picker showTime format="YYYY-MM-DD HH:mm:ss" v-model="queryParam.updTimeSearch"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="状态">
                <a-select v-model="queryParam.status" placeholder="请选择状态，0:不启用;1:启用">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="0">不启用</a-select-option>
                  <a-select-option value="1">启用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="年龄">
                <a-input-number v-model="queryParam.age" placeholder="请输入年龄"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="下拉框">
                <a-select v-model="queryParam.selectCustom" placeholder="请选择自定义下拉框0:无;1:有;">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="0">无</a-select-option>
                  <a-select-option value="1">有</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="下拉框">
                <a-select :options="orgType" v-model="queryParam.selectDict" placeholder="请选择数据字典下拉框"/>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="12" :xs="24">
              <span
                class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.tempTable.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="restQuery()">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>
        <a-popconfirm title="您确认批量删除吗?" @confirm="handleDelete(selectedRows)" okText="确认" cancelText="取消">
          <a-button style="margin-left: 8px">批量删除</a-button>
        </a-popconfirm>
      </div>
    </div>
    <s-table
      ref="tempTable"
      size="default"
      :rowKey="(recordActive) => recordActive.id"
      :columns="columns"
      :rowSelection="options.rowSelection"
      :alert="options.alert"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="status" slot-scope="text">
        {{ getStatusName(text) }}
      </span>
      <span slot="selectCustom" slot-scope="text">
        {{ getCustomName(text) }}
      </span>
      <span slot="selectDict" slot-scope="text">
        {{ getDictName(text) }}
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
      ref="tempDetail"
      :formatDate="formatDate"
      :getStatusName="getStatusName"
      :get-custom-name="getCustomName"
      :get-dict-name="getDictName"
      :record="recordActive"/>
    <add
      ref="tempAdd"
      :record="recordActive"
      :org-type="selectOrgType"
      :formatDate="formatDate"
      :save="save"
      :refresh="refresh"
    />
    <edit
      ref="tempEdit"
      :record="recordActive"
      :org-type="selectOrgType"
      :update="update"
      :refresh="refresh"
      :formatDate="formatDate"
      :get-moment="getMoment"
    />
  </a-card>
</template>

<script>

import { formatDate, getMoment, isEmpty } from '@/utils/common'
import { del, get, queryList, save, update } from '@/api/example/temp'
import { getDictByType } from '@/api/common'
import { STable } from '@/components'
import Detail from './components/Detail'
import Add from './components/Add'
import Edit from './components/Edit'

export default {
  name: 'TempList',
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
      // 日期工具类
      formatDate: formatDate,
      getMoment: getMoment,
      // 查询参数
      queryParam: {},
      // 列表表头
      columns: [
        {
          title: '编码',
          dataIndex: 'code',
          key: 'code '
        }, {
          title: 'name',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: '新建日期',
          dataIndex: 'addTime',
          key: 'addTime'
        }, {
          title: '更新时间',
          dataIndex: 'updTime',
          key: 'updTime'
        }, {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        }, {
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
        }, {
          title: '自定义',
          dataIndex: 'selectCustom',
          key: 'selectCustom',
          scopedSlots: { customRender: 'selectCustom' }
        }, {
          title: '数据字典',
          dataIndex: 'selectDict',
          key: 'selectDict',
          scopedSlots: { customRender: 'selectDict' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '320px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 单个记录行
      recordActive: {},
      // 列表加载数据方法
      loadData: parameter => {
        if (this.queryParam.addTimeSearch) {
          this.queryParam.addTimeSearch[0] = this.queryParam.addTimeSearch[0].format('YYYY-MM-DD')
          this.queryParam.addTimeSearch[1] = this.queryParam.addTimeSearch[1].format('YYYY-MM-DD')
        }
        if (this.queryParam.updTimeSearch) {
          this.queryParam.updTimeSearch[0] = this.queryParam.updTimeSearch[0].format('YYYY-MM-DD HH:mm:ss')
          this.queryParam.updTimeSearch[1] = this.queryParam.updTimeSearch[1].format('YYYY-MM-DD HH:mm:ss')
        }
        return queryList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 10000) {
              return res.result
            }
          })
      },
      // 数据字典-组织类型
      orgType: [{ label: '全部', value: '' }],
      selectOrgType: [],
      // 列表选择
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    // 数据字典
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
  },
  computed: {},
  methods: {

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    //  状态键值转换
    getStatusName (key) {
      let value = ''
      switch (key) {
        case '0':
          value = '不启用'
          break
        case '1':
          value = '启用'
          break
      }
      return value
    },
    //  自定义键值转换
    getCustomName (key) {
      let value = ''
      switch (key) {
        case '0':
          value = '无'
          break
        case '1':
          value = '有'
          break
      }
      return value
    },
    // 数据字典键值转换
    getDictName (key) {
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
      this.$refs.tempTable.refresh(true)
    },
    // 刷新列表
    refresh () {
      this.$refs.tempTable.refresh()
    },
    // 打开详情
    handleDetail (record) {
      get(record).then(res => {
        if (res.code === 10000) {
          this.recordActive = res.result
          this.$refs.tempDetail.show()
        }
      })
    },
    // 打开新增
    handleAdd () {
      this.recordActive = {}
      this.$refs.tempAdd.show()
    },
    // 打开更新
    handleUpdate (record) {
      get(record).then(res => {
        if (res.code === 10000) {
          this.recordActive = res.result
          this.$refs.tempEdit.show()
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
