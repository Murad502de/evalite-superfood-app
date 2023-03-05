<template>
  <nav>
    <div class="settings-nav">
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

export default {
  data: () => ({
    showMenu: true,
    items: [
      {title: 'Профиль',
        link: '/profile',
        img: '/img/ico_profile.svg',
        role: ['contractor']
      },
    ],
  }),
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
  },
  methods: {}
}
</script>

<style lang="scss">
@import '/assets/scss/colors.scss';

.settings-nav {

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    padding: 12px 10px;
  }

  li a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    font-size: 12px;
    line-height: 1.25;
  }

  li a img {
    width: 24px;
    margin-bottom: 4px;
  }
}

</style>

