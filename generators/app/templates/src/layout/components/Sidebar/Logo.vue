<template>
  <div
    class="sidebar-logo-container"
    :class="{'collapse':collapse}"
  >
    <router-link
      class="sidebar-logo-link"
      to="/"
    >
      <img
        v-if="logo"
        :src="logo"
        class="sidebar-logo"
      >
      <h1
        v-if="!collapse"
        class="sidebar-title"
      >
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>

<script>
import { system } from '@/settings'
import logo from '@/assets/logo.png'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: system,
      logo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/element-variables.scss';
@import '@/styles/variables.scss';
@import '@/styles/mixins/_typo.scss';

.sidebarLogoFade-enter-active,
.sidebarLogoFade-left-active
{
  transition: opacity 2s ease-in-out;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 1;
}

.sidebar-logo-container {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 60px;
  background-color: $menuBg;

  & .sidebar-logo-link {
    display: flex !important;
    align-items: center;
    padding: 0 20px;
    overflow: hidden;

    & .sidebar-logo {
      transition: margin-right 0.28s;
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }

    & .sidebar-title {
      flex: 1 0;
      display: inline-block;
      color: $--color-white;
      font-size: $--font-size-large;
      font-weight: $font-weight-medium;
      @include ellipsis;
    }
  }
  &.collapse {
    @keyframes logo-fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .sidebar-logo-link {
      justify-content: center;
      animation: logo-fade 1.2s;
    }
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
