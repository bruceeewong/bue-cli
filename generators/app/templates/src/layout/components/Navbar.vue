<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- 全局错误栈 -->
      <error-log class="errlog-container right-menu-item hover-effect" />
      <!-- 全局错误栈 -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/common/Breadcrumb'
import Hamburger from '@/components/common/Hamburger'
import ErrorLog from '@/components/common/ErrorLog'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/element-variables.scss";
@import "@/styles/variables.scss";

.navbar {
  height: $navbarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background .3s;
  -webkit-tap-highlight-color:transparent;

  &:hover {
    background: rgba(0, 0, 0, .025)
  }
}
.breadcrumb-container {
  float: left;
}
.errlog-container {
  display: inline-block;
  vertical-align: top;
}
.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
.right-menu {
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 20px;
  line-height: 50px;

  &:focus {
    outline: none;
  }
}
.right-menu-item {
  display: inline-block;
  padding: 0 5px;
  margin-left: 10px;

  &.hover-effect {
    cursor: pointer;
    transition: background .3s;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
}
</style>
