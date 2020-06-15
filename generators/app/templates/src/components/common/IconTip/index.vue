<template>
  <el-tooltip
    :content="content"
    :placement="placement"
    :style="{ fontSize: computedSize }"
  >
    <i :class="['icon', icon]" />

    <template v-slot:content>
      <slot name="content" />
    </template>
  </el-tooltip>
</template>

<script>
/**
 * 图标提示组件, 用于标注或提示
 */
export default {
  name: 'IconTip',
  props: {
    icon: {
      type: String,
      default: 'el-icon-info'
    },
    content: {
      type: String,
      default: '提示文字'
    },
    placement: {
      type: String,
      default: 'top'
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    computedSize() {
      switch (this.size) {
        case 'small': return '16px'
        case 'medium': return '18px'
        case 'large': return '20px'
        default: return '14px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/element-variables.scss";
.icon {
  cursor: pointer;
}
.icon:hover {
  color: $--color-primary;
}
</style>
