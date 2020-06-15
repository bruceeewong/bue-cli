export default {
  model: {
    prop: 'data',
    event: 'input'
  },
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  methods: {
    hInput(val) {
      this.$emit('input', val)
    }
  }
}
