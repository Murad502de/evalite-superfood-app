<template>
  <nav>
    <Logo/>
    <div class="main-nav">
      <ul>
        <template v-for="(item, index) in items">
          <li :key="index" v-if="item.role.includes(user.type)">
            <nuxt-link active-class="active" class="nav-link" :to="item.link">
              <img :src="item.img" :alt="item.title">
              <span>{{ item.title }}</span>
            </nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>

</template>

<script>
import {mapActions} from "vuex";

export default {
  data: () => ({
    showMenu: true,
    role: 'contractor',
    items: [
      {
        title: 'Заявки',
        link: '/tasks',
        img: '/img/ico_app.svg',
        role: ['superManager', 'manager', 'dispatcher',]
      },
      {
        title: 'Заявки',
        link: '/tasks/contractor',
        img: '/img/ico_app.svg',
        role: ['contractor']
      },
      {
        title: 'Сотрудники',
        link: '/employees',
        img: '/img/ico_employees.svg',
        role: ['superManager', 'manager',]},
      {
        title: 'Исполнители',
        link: '/performers',
        img: '/img/ico_performers.svg',
        role: ['superManager', 'manager', 'dispatcher',]
      },
      {
        title: 'Клиенты',
        link: '/clients',
        img: '/img/ico_clients.svg',
        role: ['superManager',]
      },
      {
        title: 'Объекты',
        link: '/objects',
        img: '/img/ico_objects.svg',
        role: ['superManager', 'manager', 'dispatcher',]
      },
      {
        title: 'Финансы',
        link: '/finance',
        img: '/img/ico_finance.svg',
        role: ['contractor',]},
      {
        title: 'Обращения',
        link: '/appeal',
        img: '/img/ico_appeal.svg',
        role: ['superManager', 'manager', 'dispatcher', 'contractor']
      },
      {
        title: 'Уведомления',
        link: '/notification',
        img: '/img/ico_notifications.svg',
        role: ['superManager', 'manager', 'dispatcher', 'contractor']
      },
    ],
  }),
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
  },
  methods: {},
}
</script>

<style lang="scss">
@import '/assets/scss/colors.scss';

.main-nav {

  margin-top: 64px;

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    padding: 12px 10px;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #fff;
      font-size: 12px;
      line-height: 1.25;
      opacity: 0.5;

      img {
        width: 24px;
        margin-bottom: 4px;
      }
    }

    a.active {
      opacity: 1;
    }
  }
}

</style>
