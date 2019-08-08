<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a href="https://vue.ant.design/docs/vue/introduce/" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>
      <!--<notice-icon class="action"/>-->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar()"/>
          <span>{{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'personal' }">
              <a-icon type="user"/>
              <span>个人资料</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1" @click="$refs.updatePasswd.show()">
              <a-icon type="lock"/>
              <span>修改密码</span>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <update-passwd ref="updatePasswd" />
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import UpdatePasswd from '@/components/UpdatePasswd'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
    UpdatePasswd
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout () {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
