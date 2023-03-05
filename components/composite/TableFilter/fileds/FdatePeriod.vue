<template lang="pug">
  .ruqi-table-filter-date-period
    v-menu(ref="menu1"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px")

      template(v-slot:activator="{ on, attrs }")
        v-text-field(v-model="dateRangeText"
          name="name"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
          filled
          single-line
          outlined
          hide-details="true"
          readonly)

      v-date-picker(v-model="dates"
        no-title
        range)

        v-spacer
        v-btn(text color="primary" @click="menu = false") Отмена
        v-btn( text color="primary" @click="updateDate") ОК

</template>

<script>
export default {
  props: ['name', 'value'],
  data() {
    return {
      dates: [
        (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      ],
      dateFormatted: [
        this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      ],
      menu: false,
    }
  },
  computed: {
    dateRangeText() {
      return this.dateFormatted.join(' - ')
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    updateDate() {
      this.menu = false;
      this.$emit('updateFiled', this.name, this.dates);

      let value = {
        "from": '',
        "to": ''
      }

      this.$emit('input', value);
    },
  },
  watch: {
    dates(val) {
      this.dateFormatted = [this.formatDate(this.dates[0]), this.formatDate(this.dates[1])];
    },
    value() {
      this.dateFormatted = this.formatDate(this.value.substring(0, 10));
    },
  },
  mounted() {

  }
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';


.wrap-period {
  display: inline-flex;;
  align-items: center;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid $table-border-color;
  color: $grey;

  .period-title {
    margin-right: 6px;
    font-weight: 400;
  }

  .theme--light.v-input input,
  .theme--light.v-icon {
    color: $blue;
  }

  .v-application--is-ltr .v-input__prepend-outer {
    margin-right: 6px;
  }

  .theme--light.v-text-field--filled:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot:hover {
    background: #fff;
  }

  .v-text-field fieldset {
    border: none !important;
    outline: none !important;
  }

  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot {
    padding: 0;
    border: none;
  }

  .v-text-field--outlined .v-input__prepend-outer, .v-text-field--outlined .v-input__append-outer {
    margin-top: 11px;
  }
}

</style>
