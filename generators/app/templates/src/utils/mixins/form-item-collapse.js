/**
 * 表单项折叠的变量的mixin
 */
export default {
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    hCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
