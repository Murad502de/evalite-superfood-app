<template lang="pug">
  .tasks-filter
    v-select(
      name="task_status"
      v-model="select"
      :items="status_list"
      item-text="name"
      item-value="stub"
      single-line
      outlined
      filled
      @input="updateFiled('status', select)"
      hide-details
      label="Статус"
    )

    .wrap-period-task.ml-4
      v-menu(
        ref="menu1"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      )
        template(v-slot:activator="{ on, attrs }")
          v-text-field(
            v-model="dateRangeText"
            name="task_period"
            prepend-inner-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
            filled
            single-line
            outlined
            hide-details="true"
            readonly
          )

        v-date-picker(
          v-model="dates"
          no-title
          range
        )
          v-spacer
          v-btn(
            text
            color="primary"
            @click="menu = false") Отмена
          v-btn(
            text
            color="primary"
            @click="updateDate") ОК

</template>

<script>


export default {
  props: {
    status_list: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      select: '',
      options: [],
      dates: [
        (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      ],
      dateFormatted: [
        this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      ],
      menu: false,
      formValues: {
        status: '',
        until_date: {
          from: '',
          to: '',
        }
      },
    }
  },
  computed: {
    dateRangeText() {
      return this.dateFormatted.sort().join(' - ')
    },
    postBody() {

      let postBody = [];

      if (this.formValues.status.length > 0) {
        postBody.push(
          {
            "field": "status",
            "type": "list",
            "value": this.formValues.status
          },
        );
      }

      if (this.formValues.until_date.length > 0) {
        postBody.push(
          {
            "field": "until_date",
            "type": "datetime",
            "value": this.formValues.until_date
          }
        );
      }

      return postBody;
    },
  },
  watch: {
    dates() {
      this.dateFormatted = [this.formatDate(this.dates[0]), this.formatDate(this.dates[1])];
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
      this.updateFiled('until_date', this.dates);
    },

    updateFiled(field, value) {
      if (field == 'until_date') {

        let sort_dates = value.sort();

        this.formValues.until_date.from = sort_dates[0];
        this.formValues.until_date.to = sort_dates[1];
      } else {
        this.formValues[field] = [value];
      }
      this.$emit('applyFilter', this.postBody);

    }
  },
}
</script>

<style lang="scss">

.tasks-filter {
  display: flex;
  align-items: center;

  .v-text-field--filled {
    max-width: 220px;
  }

  .v-input__control {
    .v-input__slot {
      min-height: 48px !Important;

      .v-input__append-inner {
        margin-top: 10px !Important;
      }

      .v-icon {
        color: #7A91A9;
      }
    }

    fieldset {
      border-radius: 10px;
    }
  }

  .wrap-period-task {
    .v-input__prepend-inner {
      margin-top: 12px !Important;
    }
  }


}
</style>
