<template>

  <div class="add-performers-selected-panel">
    <div class="wrapper">
      <div class="selected">
        <div class="selected__title">Выбрано</div>
      </div>

      <div class="selected-count">
        <div class="selected-count__title">
          <div class="count-title_num">
            {{ selected }}
          </div>

          <div class="count-title_txt">исполнителей</div>
        </div>
      </div>

      <div class="add-btn" @click="handlers().selectPerformers()">
        <div class="wraper">
          <div class="btn-title">
            добавить в заявку
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    selected: {
      type: Number,
      default: 0,
    }
  },

  methods: {
    handlers() {
      return {
        selectPerformers: () => {
          console.debug("selectPerformers emit"); // TODO delete
          this.$emit('select_performers');
        }
      }
    }
  },
}

</script>

<style lang="scss">
.add-performers-selected-panel {
  position: sticky;
  bottom: 0;
  background: #F6FBFF;
  padding: 16px 60px 18px;
  z-index: 100;

  .wrapper {
    color: black;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
  }
}

.selected {
  .selected__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #000000;
  }
}

.selected-count {
  padding-left: 22px;
  padding-right: 51px;

  .selected-count__title {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #0082DE;

    .count-title_txt {
      margin-left: 5px;
    }
  }
}

.add-btn {
  padding: 12px 16px;
  background: #0082DE;
  border-radius: 8px;
  cursor: pointer;

  .wraper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;

    .btn-title {
      font-weight: bold;
      font-size: 14px;
      line-height: 125%;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #FDFDFD;
    }
  }
}
</style>
