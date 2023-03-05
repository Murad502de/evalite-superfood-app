<template lang="pug">
  .appeal-content
    v-tabs(v-model="tab" class="form-tabs")
      v-tab(v-for="(item, index) in tabs_list" :key="index") {{ item }}

    v-window(v-model="tab")
      v-tab-item
        Chat

      v-tab-item
        .appeal-description Описание

      v-tab-item
        .appeal-description Ответственные




</template>

<script>

import Chat from "@/components/appeal/Chat";

export default {
  components: {Chat},
  props: ['object',],
  data() {
    return {
      tabs_list: [
        'Сообщения', 'Описание', 'Ответственные'
      ],
      tab: null,
    }
  },
  methods: {
  }
}
</script>


<style lang="scss">

@import '../../assets/scss/colors';

.appeal-content{
  padding: 24px;


}

</style>
