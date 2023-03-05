<template lang="pug">
.rq-top-nav-hub
  //- .rq-top-nav-hub__node
  //-   .rq-top-nav-hub__title {{$route.meta.title}}
  rqTabs(
    v-if="$route.name === 'tasks' || $route.name === 'tasks-id'",
    :items="RQ_TABS_TASKS",
    @onRqTabClicked="onRqTabClicked",
    @unpinRqTab="onUnpinRqTabClicked"
    @closeRqTab="onCloseRqTabClicked",
  )
    template(#item="{ item }")
      .task-tabs__item
        .task-tabs__title {{ item.name }}
  SearchTasksExecutor(
    v-else-if="user.type === 'contractor' && ($route.name === 'index' || $route.name === 'tasks-contractor')"
  )
  rqBreadcrumbs(v-else, :breadcrumbs="BREADCRUMBS")
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import rqTabs from "@/components/composite/rqTabs";
import rqBreadcrumbs from "@/components/UI/rqBreadcrumbs";
import SearchTasksExecutor from './SearchTasksExecutor';

export default {
  components: {
    rqTabs,
    rqBreadcrumbs,
    SearchTasksExecutor,
  },
  computed: {
    ...mapGetters("rqTabs", ["RQ_TABS_TASKS"]),
    ...mapGetters("breadcrumbs", ["BREADCRUMBS"]),
    ...mapGetters('user', ['user',]),
  },
  methods: {
    ...mapActions("rqTabs", ["closeRqTabTasks", "unPinRqTabTasks"]),

    /* HANDLERS */
    onRqTabClicked({ item }) {
      console.debug("onRqTabClicked", item);

      this.$router.push({
        name: item.routeName,
        params: item.params,
      });
    },
    onCloseRqTabClicked({ item }) {
      console.debug("onCloseRqTabClicked", item); // DELETE

      this.closeRqTabTasks().then((result) => {
        this.$router.push(result);
      });
    },
    onUnpinRqTabClicked({ item }) {
      console.debug("onUnpinRqTabClicked", item); // DELETE

      this.unPinRqTabTasks({ rqTabTasks: item }).then((result) => {
        this.$router.push(result);
      });
    },
  },

  data() {
    return {
      items: [
        {
          name: "Все заявки",
          routeName: "tasks",
          params: {},
          isPinned: false,
          isActive: false,
          isNode: true,
        },
        {
          name: "Тестовая компонент копия",
          routeName: "tasks-id",
          params: {
            id: "bf7ce1ef-a177-42a7-b25d-7ef00865caa8",
          },
          isPinned: false,
          isActive: true,
        },
        {
          name: "02.03 Водители ЗАРА Ленина",
          routeName: "",
          params: {},
          isPinned: true,
          isActive: false,
        },
        {
          name: "02.03 Водители ЗАРА Ленина",
          routeName: "",
          params: {},
          isPinned: false,
          isActive: false,
        },
        {
          name: "02.03 Водители ЗАРА Ленина",
          routeName: "",
          params: {},
          isPinned: false,
          isActive: false,
        },
        {
          name: "02.03 Водители ЗАРА Ленина",
          routeName: "",
          params: {},
          isPinned: false,
          isActive: false,
        },
      ],
    };
  },
  mounted() {
    console.debug(this.$router);
  },
};
</script>

<style lang="scss">
.rq-top-nav-hub {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 300px);

  &__title {
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #000000;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 20px 24px;
    height: 60px;
  }

  &__node {}

  /* OBJECTS */
  .task-tabs {
    &__title {
      max-width: 250px;
    }

    &__item {
      margin-right: 10px;
    }
  }
}
</style>
