<template lang="pug">
  .ruqi-table-filter-range
    .d-flex.align-center.text-group
      .time-title от
      v-text-field(
        :name="'from_'+ params.field"
        single-line
        outlined
        filled
        v-model="value_from"
        @input="updateFiled"
        hide-details="auto"
        :rules="[rules.number]"
      )

      .time-title до
      v-text-field(
        :name="'to_'+ params.field"
        single-line
        outlined
        filled
        v-model="value_to"
        @input="updateFiled"
        hide-details="auto"
        :rules="[rules.number]"
      )

</template>

<script>


export default {
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      value_from: null,
      value_to: null,
      rules: {
        number: value => {
          const pattern = /^\d+(?:[\.,]\d+)?$/; // /(?<=^| )\d+(\.\d+)?(?=$| )/;
          if (value) {
            return pattern.test(value) || 'Введите число'
          } else {
            return true;
          }
        },
      },
    }
  },
  methods: {
    updateFiled() {
      let value = {};
      if (this.params.type == 'range') {
        if(this.value_from){
          value.from = this.value_from
        }

        if(this.value_to){
          value.to = this.value_to
        }

      } else if (this.params.type == 'range_composit') {
        value = [
          {
            "field": "age_from",
            "value": this.value_from,
          },
          {
            "field": "age_to",
            "value": this.value_to
          }
        ]
      }

      this.$emit('input', value);
    }
  },
  created() {
    if(this.params.value){
      if (this.params.type == 'range') {
        this.value_from = this.params.value.from;
        this.value_to = this.params.value.to;
      }
      else{
        this.value_from = this.params.value[0].value;
        this.value_to = this.params.value[1].value;
      }
    }
  },
  watch: {
    params: {
      handler(val){
        if(this.params.value){
          if (this.params.type == 'range') {
            this.value_from = this.params.value.from;
            this.value_to = this.params.value.to;
          }
          else{
            this.value_from = this.params.value[0].value;
            this.value_to = this.params.value[1].value;
          }
        }

      },
      deep: true
    }
  },
}
</script>

<style lang="scss">

.ruqi-table-filter-range {

  .text-group {
    align-items: center;

    .time-title {
      margin: 0 10px;
      font-weight: 600;

      &:first-child {
        margin-left: 0
      }
    }
  }

  .v-input__slot {
    margin-bottom: 0;
  }

  .v-input {
    max-width: 80px;

    .v-text-field__details {
      position: absolute;
      bottom: -22px;
      width: 100px;
      padding: 0;
    }

  }

  .v-text-field--outlined > .v-input__control > .v-input__slot,
  .theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
    background: #fff;
  }


}


</style>
