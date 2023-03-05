<template>
  <div class="time-group d-flex">
    <span class="time-title">с</span>
    <FTypeTime name="time_begin"  v-model="time_start" @input="$emit('input', time_start, {'item_name': 'time_start'})"/>
    <span class="time-title">до</span>
    <FTypeTime name="time_end"  v-model="time_end" @input="$emit('input', time_end, {'item_name': 'time_end'})"/>
  </div>
</template>

<script>
export default {
  props: ['name', 'params'],
  data() {
    return {
      time_start: '',
      time_end: '',
    }
  },
  methods: {

  },
  created() {
  }
}
</script>

<style lang="scss">
.time-group{
  align-items: center;

  .time-title{
    margin: 0 10px;

    &:first-child{
      margin-left: 0
    }
  }
}

</style>
