<template lang="pug">
.rq-user-menu
  v-menu(
    bottom
    min-width="280px"
    rounded="10"
    offset-y
    nudge-bottom="10"
    z-index="1000"
  )
    template(v-slot:activator="{on}")
      v-btn(text v-on="on" height="56" class="mr-3")
        v-col(class="pl-0")
          v-avatar(color="#D6D0FE" size="32")
            span(class="white--text" v-if="user.firstname") {{user.firstname.substr(0, 1)}}
            span(class="white--text" v-if="user.lastname") {{user.lastname.substr(0, 1)}}

        v-col(class="px-0")
          p(class="user_name") {{ user.firstname }} {{ user.lastname }}

    v-card
      v-list-item-content(class="justify-start")
        div(class="mx-auto text-left")
          v-btn(text link to="/profile/") Профиль
          v-divider(class="my-3")
          v-btn(text @click="handlers().signout()") Выход

  v-badge(bordered color="error" content="25" overlap)
    v-btn(text style="padding: 0 !important;margin: 0 !important;width: auto;height: auto;min-width: unset;")
      img(src="/img/ico_mess.svg" alt="Сообщения")

  v-badge(bordered color="error" overlap style="margin-left: 20px;")
    v-btn(text @click="$router.push('/notification')" style="padding: 0 !important;margin: 0 !important;width: auto;height: auto;min-width: unset;")
      img(src="/img/ico_bell.svg" alt="Оповещение")
</template>

<script>
import { mapActions } from "vuex";

export default {
  components: {},
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
};
</script>

<style lang="scss" scoped>
.v-menu__content {
  box-shadow: 0 0 73px 5px #edeef1;
}

.v-btn {
  border-radius: 14px;
  margin-left: 12px;
  text-transform: none;
  text-align: left;

  p {
    margin: 0;
    color: #7a91a9;
    font-weight: 600;
  }

  .user_name {
    font-size: 16px;
  }

  .user_mail {
    font-size: 14px;
  }
}

.rq-user-menu {
  width: 350px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
}
</style>
