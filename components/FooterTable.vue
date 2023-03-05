<template>
  <v-row no-gutters v-if="pageCount > 1">
    <v-col
      cols="4"
    >
      <v-row class="align-center">
        <v-col cols="9" class="d-flex align-center pa-0">
          <v-subheader>Строк на странице:</v-subheader>
          <div class="pagination-page-num">
            <v-text-field
              :value="itemsPerPage"
              type="text"
              @input="setItemsPerPage($event)"
              single-line
              outlined
              hide-details="true"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      cols="4"
    >
      <v-pagination
        v-model="currentPage"
        :length="pageCount"
        @input="setCurrentPage()"
      ></v-pagination>
    </v-col>
  </v-row>

</template>

<script>
export default {
  props: ['itemsPerPage', 'pageCount', 'page'],
  data() {
    return {
      currentPage: null
    }
  },
  methods:{
    setItemsPerPage(value){
      this.$emit('setItemsPerPage', value)
    },
    setCurrentPage(value){
      this.$emit('setCurrentPage', this.currentPage)
    },
  },
  created() {
    this.currentPage = this.page;
  }
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';


</style>
