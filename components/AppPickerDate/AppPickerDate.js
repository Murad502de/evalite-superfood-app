
export default {
  props: {
    value: {
      type: String | Array,
      default: '',
    },
    prefix: {
      type: String | Array,
      default: 'Дата:',
    },
    range: {
      type: Boolean,
      default: false,
    },
    'hideActions': {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      dates: null,
      dateFormatted: null,
      menu: false,
    }
  },
  computed: {
    dateRangeText() {
      if (this.range) return this.dateFormatted?.join(' - ');
      return this.dateFormatted;
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    cancel() {
      this.menu = false;
    },
    ok() {
      this.menu = false;

      if (this.range) {
        if (this.dates.length > 1) {
          if ((Date.parse(this.dates[0]) > Date.parse(this.dates[1]))) {
            this.$emit('ok', [this.dates[1], this.dates[0]]);
          } else {
            this.$emit('ok', this.dates);
          }
        }
      } else {
        this.$emit('ok', this.dates);
      }
    },
  },
  watch: {
    dates(newVal) {
      console.debug('AppPickerDate/watch/dates/newVal', newVal); //DELETE
      console.debug('AppPickerDate/watch/dates/this.range', this.range); //DELETE

      if (this.range && !!newVal) {
        if (
          (newVal.length > 1) &&
          (Date.parse(newVal[0]) > Date.parse(newVal[1]))
        ) {
          this.dateFormatted = [this.formatDate(this.dates[1]), this.formatDate(this.dates[0])];
        } else {
          this.dateFormatted = [this.formatDate(this.dates[0]), this.formatDate(this.dates[1])];
        }
      } else {
        this.dateFormatted = this.formatDate(this.dates);
      }

      console.debug('AppPickerDate/watch/dates/this.dateFormatted', this.dateFormatted); //DELETE
      this.$emit('change', this.dateFormatted);
    },
    value(newVal, oldVal) {
      this.dates = newVal;
    },
  },
  created() { },
}
