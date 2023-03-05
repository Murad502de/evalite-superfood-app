import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// Translation provided by Vuetify (javascript)
import ru from 'vuetify/lib/locale/ru'

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'ru'
    },
  },
})

export default new Vuetify({
  lang: {
    locales: { ru },
    current: 'ru',
  },
})
