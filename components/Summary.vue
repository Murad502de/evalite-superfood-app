<template>
  <div class="wrap-summary">
    <div class="title-summary-payments">
      Всего заработано:
      <span>{{ payments }} руб.</span>
    </div>
    <div class="title-summary-tasks">
      Выполнено заявок:
      <span>{{ tasks }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payments: {
      type: Number,
      default: 0,
    },

    tasks: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>

@import '/assets/scss/colors.scss';

.wrap-summary {
  display: inline-flex;
  flex-direction: column;
  background: #F6FBFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
  border-radius: 14px;
  padding: 16px;
  min-width: 449px;

  .title-summary-payments {
    font-size: 20px;
    font-weight: 700;

    span {
      color: $blue;
    }
  }

  .title-summary-tasks{
    font-weight: 600;
    color: $grey;

    span{
      font-weight: 700;
      color: $black;
    }
  }

}
</style>
