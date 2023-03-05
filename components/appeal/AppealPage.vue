<template lang="pug">
  .chat-page
    AppealHeader
    AppealContent

</template>

<script>

import AppealHeader from "@/components/appeal/AppealHeader";
import AppealContent from "@/components/appeal/AppealContent";

export default {
  components: {AppealHeader, AppealContent},
  props: ['object',],
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>


<style lang="scss">

@import '../../assets/scss/colors';

.chat-page{

}

</style>
