<template lang="pug">

.date-input-with-title
  .date__haupt-titel {{ title }}
  v-menu(
    ref="menu1"
    v-model="menu"
    :close-on-content-click="true"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  )
    template( v-slot:activator="{ on, attrs }" )
      v-text-field(
        :value="value"
        v-bind="attrs"
        v-on="on"
        hide-details="true"
        single-line
        outlined
        background-color="#FFFFFF"
      )
        v-icon.calendar-symbol( slot="prepend-inner" role="img")

    v-date-picker(
      v-model="date"
      no-title
      @input="updateDate"
      @change="handlers().onDateChange( $event )"
    )

</template>

<script>
export default {
  props : {
    title : {
      type : String,
      default : "",
    },

    value : {
      type : String,
      default : "",
    },
  },

  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu: false,
      show_date: true,
    }
  },
  methods: {
    formatDate (date)
    {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },

    updateDate ()
    {
      //this.$emit('input', this.date);
      this.show_date = false;
    },

    handlers ()
    {
      return {
        onDateChange : ( payload = {} ) => {
          console.debug( "onDateChange", payload ); // DELETE

          this.$emit( 'date_change', payload );
        },
      }
    }
  },
  watch : {
    date (val)
    {
      this.dateFormatted = this.formatDate(this.date);
    },

    value ()
    {
      this.dateFormatted = this.formatDate(this.value.substring(0, 10));
    },
  },

  computed: {
    fullDate ()
    {
      return this.dateFormatted;
    },
  },

  mounted ()
  {
    this.$emit('input', this.fullDate);
  }
}
</script>

<style lang="scss">

.date-input-with-title
{
  /* OBJECTS STYLES START */
    .date__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #263043;
      margin-bottom: 16px;
      white-space: nowrap;
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .calendar-symbol
    {
      width: 30px;
      height: 30px;
      background: url( '@/assets/img/calendar-start_date.svg' ) no-repeat;
    }
  /* MIXINS STYLES END */
}

</style>
