<template>
  <a-card :bordered="false">
    <div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="用户名">
                <a-input v-model="queryParam.userName" placeholder="请输入用户名"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="姓名">
                <a-input v-model="queryParam.fullName" placeholder="请输入姓名"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="工号">
                <a-input v-model="queryParam.workNum" placeholder="请输入工号"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="手机号">
                <a-input v-model="queryParam.mobileNum" placeholder="请输入手机号"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="邮箱">
                <a-input v-model="queryParam.email" placeholder="请输入邮箱"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="所属机构" >
                <a-tree-select
                  allowClear
                  showSearch
                  :treeData="treeData"
                  :filterTreeNode="filterTreeNode"
                  v-model="queryParam.srcOrgId"
                  placeholder="请选择所属机构">
                </a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item
                label="入职时间" >
                <a-range-picker v-model="queryParam.enterDate" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="状态">
                <a-select v-model="queryParam.enabled" placeholder="请选择状态" >
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="true">正常</a-select-option>
                  <a-select-option value="false">冻结</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <span
                class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="restQuery()">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>
      </div>
    </div>
    <s-table
      ref="table"
      size="default"
      :rowKey="(record) => record.id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="enabled" slot-scope="text" >
        {{ getEnableName(text) }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="handleUpdate(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
          <a-divider type="vertical" />
          <a @click="handleDisabled(record)">冻结</a>
          <a-divider type="vertical" />
          <a @click="handleEnabled(record)">解冻</a>
          <a-divider type="vertical" />
          <a @click="handleRestPassword(record)">重置密码</a>
        </template>
      </span>
    </s-table>
    <detail ref="userDetail" :record="info" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { isEmpty } from '@/utils/common'
import { queryList, save, update, get, del, checkWorkNum, checkUserName, enabled, resetPassword, getUserInfo } from '@/api/sys/user'
import { treeList } from '@/api/sys/organization'
import { roleList } from '@/api/sys/role'
import { STable } from '@/components'
import Detail from './components/Detail'

/**
 * 格式化所属机构树
 * @param list
 */
const formatTree = list => {
  list.forEach(item => {
    item.title = item.name
    item.value = item.id
    if (item.children) {
      formatTree(item.children)
    }
  })
}
export default {
  name: 'UserList',
  components: { STable, Detail },
  data () {
    return {
      // 查询参数
      queryParam: {
        searchBeginTime: '',
        searchEndTime: ''
      },
      columns: [
        {
          title: '编码',
          dataIndex: 'userCode',
          key: 'userCode'
        }, {
          title: '用户名',
          dataIndex: 'userName',
          key: 'userName'
        }, {
          title: '姓名',
          dataIndex: 'fullName',
          key: 'fullName'
        }, {
          title: '手机号',
          dataIndex: 'mobileNum',
          key: 'mobileNum'
        }, {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email'
        }, {
          title: '工号',
          dataIndex: 'workNum',
          key: 'workNum'
        }, {
          title: '所属机构',
          dataIndex: 'srcOrgName',
          key: 'srcOrgName'
        }, {
          title: '状态',
          dataIndex: 'enabled',
          key: 'enabled',
          scopedSlots: { customRender: 'enabled' }
        }, {
          title: '入职时间',
          dataIndex: 'entryTime',
          key: 'entryTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '320px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      info: {},
      loadData: parameter => {
        if (!isEmpty(this.queryParam.enterDate) && Object.keys(this.queryParam.enterDate).length === 2) {
          this.queryParam.searchBeginTime = moment(this.queryParam.enterDate[0]).format('YYYY-MM-DD')
          this.queryParam.searchEndTime = moment(this.queryParam.enterDate[1]).format('YYYY-MM-DD')
        } else {
          this.queryParam.searchBeginTime = ''
          this.queryParam.searchEndTime = ''
        }
        return queryList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 10000) {
              return res.result
            }
          })
      },
      treeData: []
    }
  },
  created () {
    treeList().then((res) => {
      if (res.code === 10000) {
        formatTree(res.result)
        this.treeData = res.result
      }
    })
  },
  methods: {
    // 所属机构树过滤
    filterTreeNode (inputValue, treeNode) {
      return treeNode.data.props.title.indexOf(inputValue) > -1
    },
    getEnableName (enableKey) {
      if (!isEmpty(enableKey)) {
        return enableKey ? '正常' : '禁用'
      }
      return ''
    },
    restQuery () {
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    handleDetail (record) {
      get(record).then(res => {
        if (res.code === 10000) {
          this.info = res.result
          this.$refs.userDetail.show()
        }
      })
    },
    handleAdd () {

    },
    handleUpdate (record) {

    },
    handleDelete (record) {

    },
    handleDisabled (record) {

    },
    handleEnabled (record) {

    },
    handleRestPassword (record) {

    }
  }
}
</script>
