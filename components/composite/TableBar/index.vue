<template lang="pug">
  .ruqi-table-bar
    .filter-row.d-flex.pa-5.justify-space-between(:class="{ 'search-is-focus': isSearchFocus }")
      slot



</template>

<script>


export default {
  data() {
    return {
      isSearchFocus: 0,

    }
  },
  computed: {},
  methods: {
    focusSearch() {
      this.isSearchFocus = 1;
    },
    blurSearch(){
      this.isSearchFocus = 0;
    }
  },
}
</script>

<style lang="scss">

.ruqi-table-bar {


}


</style>
