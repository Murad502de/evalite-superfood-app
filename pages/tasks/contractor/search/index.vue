<template lang="pug">
.tasks-executor-search
  .tasks-executor-search--mobile
    .tasks-executor-search--mobile__header
      .tasks-executor-search--mobile__header-title Поиск работы

      mSearchLine.tasks-executor-search--mobile__header-search
      mContentDisplayController.tasks-executor-search--mobile__header-display-ctrl(
        @clickOnTab="setTasksView"
      )

  .tasks-executor-search--desktop
    h1 Поиск работы

  TasksFilter(
    :regions="regions"
    :professions="professions"
    :loaderFilter="loaderFilter"
    :mFilterVisibility="mFilterVisibility"
    @showMobFilter="showMobFilter"
    @hideMobFilter="hideMobFilter"
    @apply="applyFilter"
    @reset="resetFilter"
  )

  .tasks-executor-search--desktop
    ContentDisplayController.tasks-executor-search--desktop__content-display-ctrl(
      @clickOnTab="setTasksView"
    )

  v-tabs-items(v-model="tasksTab")
    v-tab-item
      TasksList.tasks-executor-search--task-list(:tasks="searchTasks")

    v-tab-item
      Map(
        :class="[{ 'tasks-executor-search--map': !isMobile && !isTablet }, { 'tasks-executor-search--map_mobile': isMobile || isTablet },]"
        :center_coords="coords"
        :markers="searchTasks"
        :entity="'contractor'"
        zoom="8"
        height="546"
      )
</template>

<script>
import { mapActions, mapGetters, } from 'vuex';
import ContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/desktop';
import mContentDisplayController from '@/components/pages/tasks/executor/search/ContentDisplayController/mobile';
import TasksFilter from '@/components/pages/tasks/executor/search/TasksFilter';
import TasksList from '@/components/pages/tasks/executor/search/TasksList';
import mSearchLine from '@/components/pages/tasks/executor/search/SearchLine';
import Map from '@/components/Map';

export default {
  components: {
    ContentDisplayController,
    mContentDisplayController,
    TasksFilter,
    TasksList,
    mSearchLine,
    Map,
  },

  props: {},
  data: () => ({
    /* DICTIONARY */
    radii: [
      {
        uuid: '1km',
        name: '1км',
        value: '1',
      },
      {
        uuid: '10km',
        name: '10км',
        value: '10',
      },
      {
        uuid: '15km',
        name: '15км',
        value: '15',
      },
    ],
    regions: [],
    professions: [],
    coords: [45.04, 38.98],

    /* LOADERS */
    loaderFilter: false,

    /* VISIBILITITY STATES */
    mFilterVisibility: false,

    /* COUNTERS */
    tasksTab: 0,
  }),
  computed: {
    ...mapGetters('user', [
      'searchTasks',
    ]),
    isMobile() {
      return this.$store.getters["platformDetection/IS_MOBILE"];
    },
    isTablet() {
      return this.$store.getters["platformDetection/IS_TABLET"];
    },
    isSmallScreen() {
      return this.$store.getters["platformDetection/IS_SMALL_SCREEN"];
    },
    isLargeScreen() {
      return this.$store.getters["platformDetection/IS_LARGE_SCREEN"];
    },
    isExtraLargeScreen() {
      return this.$store.getters["platformDetection/IS_EXTRA_LARGE_SCREEN"];
    },
  },

  watch: {},
  methods: {
    ...mapActions('user', [
      'fetchSearchTasks',
    ]),
    ...mapActions('dictionary', [
      'fetchRegions',
      'fetcProfessions',
    ]),

    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    setTasksView(tab) {
      this.tasksTab = tab;
    },
    showMobFilter() {
      console.debug('showMobFilter'); // DELETE

      this.mFilterVisibility = true;
    },
    hideMobFilter() {
      this.mFilterVisibility = false;
    },
    async applyFilter(payload = null) {
      if (!payload) return;

      this.loaderFilter = true;

      console.debug("applyFilter[CMP]", payload); // DELETE

      await this.fetchSearchTasks({ filter: payload })

      this.loaderFilter = false;
      this.mFilterVisibility = false;
    },
    resetFilter() {
      this.professions = this.professions.map((profession) => ({
        ...profession,
        selected: false,
      }));
    },


    /* HELPERS */
  },

  async created() {
    await this.fetchRegions().then((regions) => {
      this.regions = regions;
    });
    await this.fetcProfessions().then((professions) => {
      this.professions = professions.map((profession) => ({
        ...profession,
        selected: false,
      }));
    });
    this.fetchSearchTasks();
  },
  mounted() { },
}
</script>

<style lang="scss">
.tasks-executor-search {
  &--desktop {
    display: block;
    max-width: 1272px;

    &__content-display-ctrl {
      margin-top: 32px;
    }
  }

  &--mobile {
    display: none;

    &__header {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
      background: #0082DE;
      padding-top: 16px;
      padding-bottom: 32px;

      &-title {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 125%;
        color: #FFFFFF;

        @media screen and (min-width: 370px) {
          width: 344px;
        }

        @media screen and (max-width: 370px) {
          width: 315px;
        }
      }

      &-search {
        margin-top: 16px;
      }

      &-display-ctrl {
        margin-top: 20px;
      }
    }
  }

  &--task-list {
    margin-top: 24px;
  }

  &--map {
    margin-top: 24px;
  }

  @media screen and (max-width: 768px) {
    &--desktop {
      display: none;
    }

    &--mobile {
      display: block;
    }
  }
}
</style>
