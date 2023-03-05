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
  computed: {},
  methods: {
    updateFiled() {
      const value = {
        "from": this.value_from,
        "to": this.value_to
      }
      this.$emit('input', value);
    }
  },
}
</script>

<style lang="scss">

.ruqi-table-filter-range{

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
