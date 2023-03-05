<template lang="pug">
.ruqi
  v-app(app)
    v-main
      v-container
        v-navigation-drawer(
          width="98"
          color="blue"
          app
          mobile-breakpoint="769"
        )
          div(class="wrapper-main-menu d-flex flex-column justify-space-between")
            Navbar
            Settingsnav
        .ruqi__wrapper
          Topbar(v-if="isSmallScreen || isLargeScreen || isExtraLargeScreen")
          mAppbar(v-if="isMobile || isTablet")

          .content
            Nuxt
            Alert(:requestSuccess="requestSuccess")

          Bottombar.ruqi__mbottombar(v-if="isMobile || isTablet")
</template>

<script>
import { mapActions } from "vuex";
import Topbar from '@/components/Topbar/index.vue';
import Bottombar from '@/components/Navigation/mobile/Bottombar';
import mAppbar from '@/components/Navigation/mobile/Appbar';

export default {
  name: "default",
  components: {
    Topbar,
    Bottombar,
    mAppbar,
  },

  data() {
    return {
      timerRuqiId: null,
    };
  },

  computed: {
    requestSuccess() {
      return this.$store.getters["response/requestSuccess"];
    },
    authorized() {
      return this.$store.getters["user/userAuthorizationStatus"];
    },
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

  watch: {
    $route: {
      handler(to, from) {
        const ruqi = document.querySelector(".ruqi");

        if (!ruqi) {
          this.timerRuqiId = setInterval(
            () => {
              const ruqi = document.querySelector(".ruqi");

              if (ruqi && to.name) {
                ruqi.classList.add("page--" + to.name.toLowerCase());

                clearInterval(this.timerRuqiId);
              }
            },

            10
          );

          return;
        }

        if (from !== undefined) {
          ruqi.classList.remove("page--" + from.name.toLowerCase());
        }

        ruqi.classList.add("page--" + to.name.toLowerCase());
      },

      immediate: true,
    },
  },

  methods: {
    ...mapActions("breadcrumbs", [
      'initBreadcrumbs',
    ]),

    /* HANDLERS */
    resize(event) {
      console.debug("resize", event.target.outerWidth);
    },

    /* HELPERS */
    isLoginPage() {
      return this.$route.name === "signin";
    },
  },

  async created() {
    this.$platformDetection.initPlatforms({ width: Number(window.outerWidth) });
    this.$platformDetection.onSubscribe();
    await this.$socket.setQuery({
      ...this.$socket.query,
      token: JSON.parse(localStorage.getItem('ruqi_auth_data')).token,
    });
    this.$socket.connect();
  },
  mounted() { },
  beforeUnmount() {
    console.debug("beforeUnmount");

    this.$platformDetection.offSubscribe();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
@import "/assets/scss/colors.scss";

html {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  color: $grey;

  .v-application {
    font-family: "Source Sans Pro", sans-serif;
  }

  .wrapper-main-menu {
    height: 100%;
  }

  .content {
    position: relative;
    z-index: 50;
  }
}

/* OBJECTS STYLES START */
.page--signin {
  padding: 0;
  margin: 0;
  // background-color  : #006EDF;

  .v-application {
    // background-color  : #006EDF;

    .container {
      padding: 0;
      margin: 0;
    }
  }
}

/* OBJECTS STYLES END */

/* MIXINS STYLES START */
.page--performers-id,
.page--employees-id {
  background-color: #f2faff;

  #app {
    background-color: #f2faff;
  }
}

/* MIXINS STYLES END */

@media screen and (max-width: 768px) {
  .ruqi {
    padding: 0;

    &__wrapper {
      height: 100vh;
    }

    &__mbottombar {
      //top: 100%;
    }

    .container {
      padding: 0;
    }
  }
}
</style>
