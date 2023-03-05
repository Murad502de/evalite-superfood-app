<template lang="pug">
  .executor-status-active
    nuxt-link(:to="link")
      v-icon(:class="css_class") mdi-circle-medium
      span {{ full_name }}

</template>

<script>


export default {
  props: {
    status_alias: {
      type: String,
      default: '',
    },
    lastname: {
      type: String,
      default: '',
    },
    firstname: {
      type: String,
      default: '',
    },
    middlename: {
      type: String,
      default: '',
    },
    short_name: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    css_class() {
      let css_class = 'green';

      switch (this.status_alias) {
        case 'day':
          css_class = 'green';
          break;
        case 'week':
          css_class = 'yellow';
          break;
        case 'month':
          css_class = 'red';
          break;
      }

      return css_class;
    },

    full_name() {
      if (!this.short_name) {
        return `${this.lastname} ${this.firstname} ${this.middlename}`;
      }else{
        return `${this.lastname} ${this.firstname.substr(0, 1)}. ${this.middlename.substr(0, 1)}.`;
      }
    },
  },
}
</script>

<style lang="scss">

.executor-status-active {

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #263043 !important;

    .v-icon {
      background-color: transparent !important;

      &.green {
        color: #71D472;
      }

      &.red {
        color: #EB4D3D;
      }

      &.yellow {
        color: #F4D150;
      }
    }
  }


}

</style>
