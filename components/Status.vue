<template>
  <div class="state" :class="status">{{title}}:
    <div class="dote_status"></div>
    <div class="text_status">{{status_text}}</div>
  </div>

</template>

<script>
export default {
  props: ['title', 'status', 'status_text'],
  data() {
    return {}
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.state {
  display: flex;
  align-items: center;

  .dote_status {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    margin-right: 4px;
    margin-left: 8px;
  }
}

.state.active {
  .text_status {
    color: $green;
  }

  .dote_status {
    background: $green;
  }

}
</style>
