<template lang="pug">
  .filter-row-left.d-flex
    slot


</template>

<script>

export default {
  data() {
    return {


    }
  },
  computed: {},
  methods: {
    focusSearch() {
      console.log('focus');
    },
    blurSearch(){
      this.isSearchFocus = 0;
    }
  },
}
</script>

<style lang="scss">




</style>
