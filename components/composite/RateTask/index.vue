<template lang="pug">
  .ruqi-rate
    v-row.d-flex.align-center
      v-col(cols="6")
        v-text-field.rate-num(
          name="rate_name"
          label="Ставка"
          outlined
          filled
          v-model="fullRate"
          hide-details="auto"
          readonly)

      v-col(cols="6")
        .form-date
          v-menu(
            v-model="menu"
            transition="scale-transition"
            bottom,
            offset-x,
            nudge-bottom="10",
            nudge-left="-16",
            content-class="rate-menu"
          )
            template(v-slot:activator="{ on, attrs }")
              v-text-field( v-model="fullDate"
                name="date_name"
                label="Действует до"
                append-icon="mdi-format-list-bulleted"
                v-bind="attrs"
                v-on="on"
                @click:append="menu = true"
                filled
                outlined
                hide-details="true"
                readonly
              )

            .rate-list.mx-auto.text-left
              .rate-list-item(v-for="el in rate.rates" :class="[el.difference == '=' ? 'current' : '']")
                .rate-item-title(v-if="el.difference == '='") Текущая
                .rate-list-item-date {{ formatDate(el.start_date) }}
                .rate-list-item-price(
                  :class="[el.difference == '>' ? 'up' : 'down']"
                )
                  v-icon(v-if="el.difference == '<'") mdi-menu-down
                  v-icon(v-if="el.difference == '>'") mdi-menu-up
                  span {{ el.rate }}


</template>

<script>


export default {
  props: {
    rate: {
      type: [Object],
      default: '',
    },
  },
  data() {
    return {
      new_rate: '',
      rates: [],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu: false,
      modal: false,
      isEdit: false,
    }
  },
  computed: {
    fullDate() {
      if (this.dateFormatted) {
        return this.dateFormatted;
      } else {
        return '-';
      }
    },
    fullRate() {
      if (this.new_rate) {
        return this.new_rate + ' р./смена';
      } else {
        return '';
      }
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      if (date == '-') return date;

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    initRate() {
      this.new_rate = this.rate.rate;
      this.dateFormatted = this.formatDate(this.rate.end_date)
      this.rates = this.rate.rates;
    },
  },
  created() {
    this.initRate();
  },
  watch: {
    rate: {
      handler(val) {
        this.initRate();
      },
      deep: true
    },
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi-rate {
  .v-col {
    margin-right: 14px;

    &:last-child {
      margin-right: 0;
    }
  }

  .form-date {
    .v-text-field--outlined {
      align-items: center;

      .v-input__prepend-outer {
        margin-top: 0;
        margin-bottom: 0;
      }
    }

  }


  .v-text-field {
    &.v-input input {
      color: #263043;
      font-weight: 600;
      padding-bottom: 0;
    }

    &.v-input.v-input--is-readonly input {
      color: #263043;
      font-weight: 400;
    }

    .v-label {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 12px;
      color: $grey;

      &.v-label--active {
        transform: translateY(-18px) scale(1);
      }
    }

    legend {
      display: none;
    }

    fieldset {
      background: #F2F4F6;
    }
  }

  .v-text-field--filled:not(.v-text-field--single-line) input {
    margin-top: 0;
  }

  .v-input__slot {
    margin-bottom: 0;

    .primary--text {
      color: $grey !important;
      caret-color: $grey !important;
    }

  }

  .v-input.rate-num {

    .v-text-field__details {
      position: absolute;
      bottom: -22px;
      width: 100px;
      padding: 0;
    }
  }

  .v-icon {
    color: $grey;
  }
}


</style>
