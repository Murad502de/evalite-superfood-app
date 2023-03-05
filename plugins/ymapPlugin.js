import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: 'a27e3df2-3b6c-4f9a-99e7-18ee954c7ff0',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
}

Vue.use(YmapPlugin, settings);
