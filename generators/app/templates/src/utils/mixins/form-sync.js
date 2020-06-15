export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localForm: {
      get() {
        return this.form
      },
      set(val) {
        this.$emit('update:form', val)
      }
    }
  },
  created() {
    this.localForm = this.form
  },
  methods: {
    hClickSearch() {
      this.$emit('submit', this.localForm)
    },
    hClickReset() {
      this.$refs.form.resetFields()
    }
  }
}
