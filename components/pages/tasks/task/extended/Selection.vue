<template lang="pug">
  .selections
    div(@click="onBackToAppClick()") Вернуться к заявке

    SelectionFilter

    Responses(:items="contractors" :headers="headers" :options="options" :model="selectedItems")

</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import SelectionFilter from "@/components/pages/tasks/task/extended/SelectionFilter";
import Responses from "@/components/pages/tasks/task/extended/Responses";

export default {
  props: {
    status_alias: {
      type: String,
      default: '',
    },
  },
  components: {SelectionFilter, Responses},
  data() {
    return {
      headers: [
        { text: "фио", align: "start", value: "fullname" },
        { text: "Лет", value: "age", width: '112px' },
        { text: "география", value: "geography", width: '286px' },
        { text: "ранг", value: "rang", width: '112px' },
        { text: "ставка", value: "rate", width: '112px'},
        { text: "профессия", value: "professions" },
        { text: "Работал", value: "works" },
      ],
      options: {},
      selectedItems: [],
    }
  },
  computed : {
    contractors () {
      return this.$store.getters[ 'contractors/contractors' ];
    },
  },
  methods: {
    ...mapActions( 'contractors', [ 'getContractors', 'inviteContractorsToVacancy', 'setSortColumn', 'setSortOrder' ] ),

    onBackToAppClick(){
      this.$emit( 'close' );
    }
  },
  async created() {
    await this.getContractors();
  }
}


</script>

<style lang="scss">

</style>
