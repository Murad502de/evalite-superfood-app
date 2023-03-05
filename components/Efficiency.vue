<template>
  <div class="wrap-efficiency">
    <div class="efficiency-item efficiency-item-profit">
      <v-icon color="#36B368">
        {{ selectIcon('profit') }}
      </v-icon>
      {{ efficiency.profit }}
    </div>
    <div class="efficiency-item efficiency-item-warning">
      <v-icon color="#7A91A9">
        {{ selectIcon('warning') }}
      </v-icon>
      {{ efficiency.warning }}
    </div>
    <div class="efficiency-item efficiency-item-time">
      <v-icon color="#7A91A9">
        {{ selectIcon('time') }}
      </v-icon>
      {{ efficiency.time }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    efficiency: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  methods: {
    selectIcon(title) {
      switch (title) {
        case 'profit' :
          return 'mdi-lightning-bolt-outline';
        case 'warning':
          return 'mdi-alert-outline';
        default:
          return 'mdi-clock-time-four-outline';
      }
    },
  }
}
</script>

<style lang="scss" scoped>

@import '/assets/scss/colors.scss';

.wrap-efficiency {
  display: flex;

  .efficiency-item {
    padding: 8px;
    border-radius: 6px;
    margin-right: 10px;
    background: #F6F6F6;
    color: $grey;
    line-height: 1;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .efficiency-item:last-child {
    margin-right: 0;
  }

  .efficiency-item.efficiency-item-profit{
    background: #EBF7F0;
    color: $green;
  }

  .v-icon{
    margin-right: 4px;
  }


}


</style>
