<template lang="pug">
.rq-topbar
  v-app-bar(v-if="$route.name != 'tasks-id-selection'"
    app
    elevation="0"
    height="60"
    color="transparent"
    class="header-content-crt_exd justify-end align-end d-flex"
  )
    topNavHub
    userMenu
</template>

<script>
import { mapActions } from "vuex";
import topNavHub from '@/components/composite/topNavHub';
import userMenu from '@/components/userMenu';

export default {
  components: {
    topNavHub,
    userMenu,
  },
  computed: {
    notifications_count() {
      return this.$store.getters["notifications/notifications_count"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    ...mapActions("notifications", ["fetchNotificationsCount"]),

    handlers() {
      return {
        signout: () => {
          window.localStorage.removeItem("ruqi_auth_data");

          this.$router.push("/signin");
        },
      };
    },
  },

  data() {
    return {};
  },
  async mounted() {
    await this.fetchNotificationsCount();
  },
};
</script>

<style lang="scss">

.rq-topbar {
  z-index: 200;
  position: relative;
}

/* OBJECTS STYLES START */
.header-content-crt_exd {
  .v-toolbar__content {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 0;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    border-bottom: 1px solid #E0E0E0;
    background: #FFFFFF;

    .row {
      margin: 0;
      flex: unset;
    }
  }
}

/* MIXINS STYLES START */
.v-app-bar {}
</style>
