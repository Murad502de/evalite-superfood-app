<template lang="pug">
  .inner-task-page-history
    v-row.d-flex.pa-5.align-center.action-row(no-gutters)
      v-col(cols="10")
        .header-dialog {{ request_id.name }}

      v-col.d-flex.justify-end(cols="2")
        v-btn.add.ml-4(text height="48" outlined @click="closeHistory")
          span закрыть

    v-container
      v-row(no-gutters)
        v-col(cols="12")
          .table-row(v-infinite-scroll="loadMore")
            .table-list-style-nospacing.px-6
              .minify-header-substrate

              v-data-table.elevation-0.table-history(
                :headers="headers_history",
                :items="request_id_history",
                item-key="uuid",
                hide-default-footer,
                disable-pagination
                :options.sync="headerOptionsTask"
                v-model="selectedItems"
              )
                template(v-slot:item.created_at="{ item }")
                  .table-history-date
                    div(v-if="item.created_at") {{ parseDate({ date: item.created_at.substr(0, 10), type: 'date' }) }}
                    div {{ item.created_at.substring(11, 19) }}

                template(v-slot:item.author="{ item }")
                  .table-history-author(v-if="item.author") {{ item.author.name }}

                template(v-slot:item.task="{ item }")
                  span(v-if="item.task") {{ item.task.name }}

                template(v-slot:item.description_new="{ item }")
                  .table-history-change
                    .table-history-change-item(v-for="el in item.description")
                      div {{el.field}} - {{el.value}}


</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  meta: {
    title: 'История'
  },
  data() {
    return {
      headers_history: [
        {text: "Дата", value: "created_at", width: "120px"},
        {text: "Автор", value: "author", width: "200px"},
        {text: "Раздел", value: "object", width: "185px"},
        {text: "Изменение", value: "description"},
      ],
      selectedItems: [],
      fetchTaskParams: {
        "page": 1,
        "per_page": 15
      },
      headerOptionsTask: {}
    }
  },
  computed: {
    ...mapGetters("breadcrumbs", ["BREADCRUMBS"]),

    request_id() {
      return this.$store.getters["request_id/request_id"];
    },
    request_id_history() {
      return this.$store.getters["request_id_dispatchers/request_id_history"];
    },


  },
  methods: {
    ...mapActions("request_id", ["fetchRequestId",]),
    ...mapActions("request_id_dispatchers", ["fetchRequestIdHistory"]),
    ...mapActions("breadcrumbs", ["initBreadcrumbs", "setBreadcrumbs"]),


    parseDate: (payload = {}) => {
      let date = payload.date.split("-");

      if (payload.type === "date") {
        return `${date[2]}.${date[1]}.${date[0]}`;
      }
    },

    loadMore() {

      let fetchParams = 'fetchTaskParams',
        sortOptions = 'headerOptionsTask',
        action = 'fetchRequestIdHistory';

      this[fetchParams].page += 1;
      this[fetchParams].sort = this[sortOptions].sortBy[0];
      this[fetchParams].order = this[sortOptions].sortDesc[0] ? 'asc' : 'desc';

      const params = this[fetchParams];

      this[action]({requestId: this.$route.params.id, params: params, concat: true});

    },

    closeHistory(){
      this.$router.go(-1);
    }

  },

  beforeDestroy() {
    this.setBreadcrumbs({
      crumbs: this.BREADCRUMBS.slice(0, this.BREADCRUMBS.length - 1),
    });
  },

  async created() {

    await this.fetchRequestId(this.$route.params.id);

    await this.fetchRequestIdHistory({requestId: this.$route.params.id, concat: false});

    this.initBreadcrumbs(this.$route.fullPath);

  }
}


</script>

<style lang="scss">

@import "../../../assets/scss/colors";

.ruqi.page--tasks-id-history{
  padding: 0;
  background: #f5f5f5;

  .theme--light.v-application {
    background: #f5f5f5;
  }

  .inner-task-page-history {

    background: #f5f5f5;

    > .container {
      padding: 0;
    }
  }

  .v-main__wrap {
    > .container {
      padding: 0;
    }
  }

  .action-row {
    background: #fff;

    .header-dialog {
      font-weight: 600;
      font-size: 20px;
    }

    .v-btn{
      min-width: 136px;
    }
  }




  .table-history {

    tbody{
      background: #fff;

      .table-history-author {
        color: $black;
      }

      .table-history-element {
        color: $black;
      }

      .table-history-change,
      .table-history-date {
        font-weight: 400;
        text-align: left;
      }

    }

  }

}

</style>
