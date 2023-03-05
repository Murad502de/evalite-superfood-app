<template lang="pug">
.rq-home
  component(:is="getComponent(user.type)")
</template>

<script>
import { mapGetters, } from 'vuex';
import superManager from '@/components/pages/home/superManager';
import manager from '@/components/pages/home/manager';
import dispatcher from '@/components/pages/home/dispatcher';
import executor from '@/components/pages/home/executor';

export default {
  components: {
    superManager,
    manager,
    dispatcher,
    executor,
  },

  props: {},
  data: () => ({}),
  computed: {
    ...mapGetters('user', ['user',]),
  },

  watch: {},
  methods: {
    /* GETTERS */
    getComponent(name) {
      switch (name) {
        case 'superManager':
          return 'superManager';

        case 'manager':
          return 'manager';

        case 'dispatcher':
          return 'dispatcher';

        case 'contractor':
          return 'executor';

        default:
          return '';
      }
    }

    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
</style>
