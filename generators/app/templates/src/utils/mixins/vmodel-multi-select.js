export default {
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    hChange(val) {
      this.$emit('change', val)
    }
  }
}
