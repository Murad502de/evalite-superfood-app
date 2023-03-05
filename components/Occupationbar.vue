<template lang="pug">
  .wrapp-occupation
    .occupation-bar(:class="priorityProp[priority].class")
      .occupation-item.active
      .occupation-item(:class="{ 'active' : occupation2}")
      .occupation-item(:class="{ 'active' : occupation3}")

    .occupation-num {{ completed }} / {{ total }}

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
.wrapp-occupation {
  display: flex;
  align-items: center;
}

.occupation-bar {
  display: flex;
  margin-right: 8px;
  align-content: center;

  .occupation-item {
    width: 22px;
    height: 10px;
    margin-right: 4px;
    background: #7A91A9;
    opacity: 0.1;
    border-radius: 2px;
  }

  .occupation-item:last-child {
    margin-right: 0;
  }

  .occupation-item.active {
    background: #F25E5E;
    opacity: 1;
  }

}

.low .occupation-item.active {
  background: #F25E5E;
}

.medium .occupation-item.active {
  background: #F4D150;
}

.high .occupation-item.active {
  background: #71D472;
}

.occupation-num {
  font-weight: 600;
  font-size: 14px;
}
</style>
