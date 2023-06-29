
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    range: {
      type: Boolean,
      default: false,
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

      if (this.range) {
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
    },
    value(newVal) {
      console.debug('AppPickerDate/watch/value/newVal', newVal); //DELETE
      this.dateFormatted = this.formatDate(this.value.substring(0, 10));
    },
    dateFormatted(newVal) {
      // console.debug('AppPickerDate/watch/dateFormatted/newVal', newVal); //DELETE
    },
  },
  created() {
    // if (this.range) {
    //   this.dates = [
    //     (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    //     (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    //   ];
    //   this.dateFormatted = [
    //     this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    //     this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    //   ];
    // } else {
    //   this.dates = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    //   this.dateFormatted = this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10));
    // }
  },
}
