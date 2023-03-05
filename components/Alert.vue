<template>
    <div class="wrapp-alert">
      <v-alert
        :value="requestSuccess.status"
        :type="requestSuccess.type"
        dismissible
        transition="fade-transition">
        {{ requestSuccess.text }}
      </v-alert>
    </div>
</template>

<script>
export default {
  props: ['requestSuccess',],
  data() {
    return {}
  },
  methods: {
  }
}
</script>


<style lang="scss" scoped>

@import '../assets/scss/colors';

.wrapp-alert{
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;

  .v-alert{
    margin: 0;
  }
}

</style>
