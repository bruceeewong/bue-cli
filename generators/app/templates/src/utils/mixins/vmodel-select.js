export default {
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  methods: {
    hChange(val) {
      this.$emit('change', val)
    }
  }
}
