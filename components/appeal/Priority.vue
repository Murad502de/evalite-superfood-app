<template>
  <div class="wrap-priority">
    <div class="occupation-bar" :class="priorityProp[priority].class">
      <div class="occupation-item active"></div>
      <div class="occupation-item" :class="{ 'active' : occupation2}"></div>
      <div class="occupation-item" :class="{ 'active' : occupation3}"></div>
    </div>
    <div class="priority-status" :style="{color: priorityProp[priority].color}">
      {{priorityProp[priority].text}}  приоритет
    </div>
  </div>
</template>

<script>
export default {
  props: ['completed', 'total'],
  data() {
    return {
      priorityProp: [
        {text: 'низкий', color: '#6EC7A4', class: 'low'},
        {text: 'средний', color: '#EFCD4F', class: 'medium'},
        {text: 'высокий', color: '#F68A6E', class: 'high'},
      ]
    }
  },
  computed: {
    occupation2: function () {
      if (this.completed / this.total > 0.33) {
        return true
      }
    },
    occupation3: function () {
      if (this.completed / this.total > 0.66) {
        return true
      }
    },
    priority: function () {
      if (this.occupation3) {
        return 2;
      }
      if (this.occupation2) {
        return 1;
      }
      else{
        return 0;
      }
    },
  },
}
</script>

<style lang="scss">

@import '../../assets/scss/colors';

.wrap-priority{
  display: flex;
  flex-direction: column;

  .occupation-bar {
    display: flex;
    margin-right: 8px;
    align-content: center;

    .occupation-item {
      width: 22px;
      height: 10px;
      margin-right: 4px;
      background: $grey;
      opacity: 0.1;
      border-radius: 2px;
    }

    .occupation-item:last-child {
      margin-right: 0;
    }

    .occupation-item.active {
      opacity: 1;
    }
  }

  .low .occupation-item.active {
    background: #6EC7A4;
  }

  .medium .occupation-item.active {
    background: $yellow;
  }

  .high .occupation-item.active {
    background: #F68A6E;
  }


  .priority-status{
    font-weight: 600;
    font-size: 12px;
    margin-top: 4px;
    line-height: 1;
  }

}
</style>
