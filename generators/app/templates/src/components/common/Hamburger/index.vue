<template>
  <div
    style="padding: 0 15px;"
    @click="toggleClick"
  >
    <i
      :class="[
        'el-icon ',
        'hamburger',
        isActive ? 'el-icon-s-fold': 'el-icon-s-unfold'
      ]"
    />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  font-size: 1.4em;
  color: #545C64;
}
</style>
