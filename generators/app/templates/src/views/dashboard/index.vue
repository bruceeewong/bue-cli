<template>
  <div class="page">
    <header class="header">
      <h1 class="header__title">欢迎使用BUE-CMS</h1>
      <p class="header__desc">使用框架解决方案快速搭建后台管理系统</p>
    </header>
    <footer class="footer">
      <small>Copyright &copy; {{ year }}</small>
      <small> | </small>
      <small>&lt;/&gt; with <i class="heart">&hearts;</i> by bruski</small>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      year: (new Date()).getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/element-variables.scss";
@import "@/styles/variables.scss";

$footer-height: 60px;

.page {
  box-sizing: border-box;
  position: relative;
  min-height: calc(100vh - #{$navbarHeight});
  padding-bottom: $footer-height;
  background-color: $--background-color-base;
}
.header {
  padding: 24px;
  background-color: $--color-white;
  &__title {
    font-size: 1.5em;
  }
  &__desc {
    font-size: 1em;
  }
}
.footer {
  position: absolute;
  bottom: 0;
  height: $footer-height;
  line-height: $footer-height;
  width: 100%;
  text-align: center;
}

@keyframes beat {
  from,
  to {
    transform: none;
  }

  50% {
    transform: scale3d(1.4, 1.4, 1.4);
  }
}
.heart {
  display: inline-block;
  color: #f20;
  font-weight: normal;
  font-style: normal;
  animation: beat 0.4s ease-in-out infinite;
}
</style>
