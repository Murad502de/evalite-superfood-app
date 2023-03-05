<template lang="pug">
  .wrap-bt-assign(@click="assign")
    v-icon mdi-plus
    .text {{text}}

</template>

<script>
export default {
  props: {
    text: {
      type: [String],
      default: 'Назначить'
    },
  },
  data() {
    return {}
  },
  methods:{
    assign() {
      this.$emit('assign');
    },
  }
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.wrap-bt-assign{
  display: flex;
  align-items: center;
  line-height: 1;

  .v-icon{
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 64px;
    border: 1.5px dashed $blue;
    font-size: 18px;
  }

  .text{
    color: $blue;
    font-size: 12px;
    text-transform: uppercase;
  }

}
</style>
