<template lang="pug">
  .inner-task-page-selections
    SelectionHeader(@onBackToAppClick="onBackToAppClick" @addToSelection="addToSelection" :task_name="request_id.name" :selected_count="selectedItems.length")

    SelectionFilter(@sendFilter="sendFilter" :filter_professions="filter_professions" :filter_rank="filter_rank" :filter_active="filter_active"
    v-if="filter_professions.length > 0")

    Responses(:items="contractors" :headers="headers" @callAction="callAction" @setSelected="setSelected")

</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import SelectionFilter from "@/components/pages/tasks/task/extended/SelectionFilter";
import SelectionHeader from "@/components/pages/tasks/task/extended/SelectionHeader";
import Responses from "@/components/pages/tasks/task/extended/Responses";

export default {
  meta: {
    title: 'Подбор'
  },
  components: {SelectionFilter, Responses, SelectionHeader},
  data() {
    return {
      headers: [
        {text: "фио", align: "start", value: "shortname", width: '200px'},
        {text: "Лет", value: "age", width: '112px'},
        {text: "география", value: "location", width: '286px'},
        {text: "%БН", value: "trust", width: '112px'},
        {text: "ранг", value: "rank", width: '112px'},
        {text: "ставка", value: "rate", width: '112px'},
        {text: "профессия", value: "professions", width: '180px'},
        {text: "Работал", value: "on_object"},
      ],
      options: {},
      selectedItems: [],
    }
  },
  computed: {
    ...mapGetters("breadcrumbs", ["BREADCRUMBS"]),

    request_id() {
      return this.$store.getters["request_id/request_id"];
    },

    contractors() {
      return this.$store.getters['request_id_dispatchers/request_id_search'];
    },

    filter_professions() {
      return this.$store.getters['request_id_dispatchers/request_id_filter_professions'];
    },

    filter_rank() {
      return this.$store.getters['request_id_dispatchers/request_id_filter_rank'];
    },

    filter_active() {
      return this.$store.getters['request_id_dispatchers/request_id_filter_active'];
    },


  },
  methods: {
    ...mapActions("request_id", ["fetchRequestId",]),
    ...mapActions('contractors', ['getContractors', 'inviteContractorsToVacancy', 'setSortColumn', 'setSortOrder']),
    ...mapActions("breadcrumbs", ["initBreadcrumbs", "setBreadcrumbs"]),
    ...mapActions("request_id_dispatchers", ["fetchRequestIdSearch", "localExecutor"]),

    onBackToAppClick() {
      this.$router.go(-1);
    },

    callAction({action, uuids, params}) {
      console.log('callAction ------', action, uuids);
      this[action](uuids, params);
    },

    setSelected(selected) {
      console.log(selected);
      this.selectedItems = selected;
    },

    addToSelection() {

      let sendUuids = [];
      for (let i = 0; i < this.selectedItems.length; i++) {
        sendUuids.push(this.selectedItems[0].uuid);
      }

      console.log('localExecutor ----- ', sendUuids)

      this.localExecutor({task_uuid: this.$route.params.id, user_uuids: sendUuids});
    },

    sendFilter(postBody) {

      this.fetchRequestIdSearch({
        requestId: this.$route.params.id,
        params: postBody,
        concat: false,
        unit: false
      });
    },

    getDataFromApi(fetchParams, watcherParams, action, options) {

      this[watcherParams] = options;

      const params = {
        "settings": {
          "value": this[fetchParams].value,
          "sort": this[watcherParams].sortBy[0],
          "order": this[watcherParams].sortDesc[0] ? 'asc' : 'desc',
          "filters": this[fetchParams].filters,
        }
      };

      this[action]({
        requestId: this.$route.params.id,
        params: params,
        concat: false,
        unit: false
      }).then(data => {
        this[fetchParams].page = 1;
        console.log('пришел ответ')
      })
    },

  },

  beforeDestroy() {
    this.setBreadcrumbs({
      crumbs: this.BREADCRUMBS.slice(0, this.BREADCRUMBS.length - 1),
    });
  },

  async created() {

    await this.fetchRequestId(this.$route.params.id);

    await this.fetchRequestIdSearch({
      requestId: this.$route.params.id,
      params: {"page": 1},
      concat: false,
      unit: true
    });

    this.initBreadcrumbs(this.$route.fullPath);

  }
}


</script>

<style lang="scss">

.ruqi.page--tasks-id-selection {
  padding: 0;
  background: #f5f5f5;

  .theme--light.v-application {
    background: #f5f5f5;
  }

  .inner-task-page-selections {

    background: #fff;

    > .container {
      padding: 0;
    }
  }

  .v-main__wrap {
    > .container {
      padding: 0;
    }
  }
}

</style>
