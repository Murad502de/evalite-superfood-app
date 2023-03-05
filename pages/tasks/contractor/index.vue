<template lang="pug">
.page-task-contractor
  Header.page-task-contractor__header
  Tabs.page-task-contractor__tabs
  .page-task-contractor__actions
  //- Banner.page-task-contractor__banner(
  //-   title
  //-   logo
  //-   description
  //-   link
  //- )
  .page-task-contractor__tasks

  Picture
</template>

<script>
import Header from '@/components/pages/tasks/executor/index/Header';
import Tabs from '@/components/pages/tasks/executor/index/Tabs';
import Banner from '@/components/composite/Banner';

import Picture from '@/components/UI/Picture';

export default {
  components: {
    Header,
    Tabs,
    Banner,

    Picture,
  },

  props: {},
  data: () => ({}),
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.page-task-contractor {
  &__header {}

  &__tabs {}

  &__actions {}

  &__banner {}

  &__tasks {}
}
</style>
