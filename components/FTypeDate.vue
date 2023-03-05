<template>
  <div class="form-date">
    <v-menu
      ref="menu1"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="fullDate"
          :name="name"
          prepend-inner-icon="mdi-calendar"
          v-bind="attrs"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
          filled
          single-line
          outlined
          hide-details="true"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        v-show="show_date"
        no-title
        @input="updateDate"
      ></v-date-picker>
      <v-time-picker
        v-show="show_time"
        v-model="time"
        full-width
        width="290"
        header-color="#2196F3"
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="menu = false"
        >
          Отмена
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="updateTime"
        >
          OK
        </v-btn>

      </v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'params', 'value'],
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu: false,
      show_date: true,
      show_time: false,
      time: '08:00',
    }
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
      //this.$emit('input', this.date);
      this.show_date = false;

      if (this.isTime){
        this.show_time = true;
      }
      else{
        this.$emit('input', this.fullDate);
        this.show_date = true;
        this.menu = false;
      }
    },
    updateTime() {
      this.$emit('input', this.fullDate);
      this.show_time = false;
      this.show_date = true;
      this.menu = false;
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    value() {
      this.dateFormatted = this.formatDate(this.value.substring(0, 10));
      this.time = this.value.substring(11, 16);
    },
  },
  computed: {
    fullDate() {
      if(this.isTime){
        return this.dateFormatted + ' ' + this.time;
      }
      else{
        return this.dateFormatted;
      }
    },
    isTime(){
      if (this.params && this.params.time === false){
        return false
      }
      else{
        return true;
      }
    }
  },
  mounted() {
    this.$emit('input', this.fullDate);
  }
}
</script>

<style lang="scss">

.form-date{
  .v-text-field--outlined {
    align-items: center;

    .v-input__prepend-outer{
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  .v-icon{
    color: #BDC8D4;
    margin-right: 8px;
  }

  .v-input {
    &.v-input--is-readonly{
      input{
        color: #263043 !important;
      }
    }
  }
}


</style>
