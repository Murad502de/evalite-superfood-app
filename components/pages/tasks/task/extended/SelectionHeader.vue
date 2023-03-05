<template lang="pug">
  .selection-header
    v-app-bar(
      app
      elevation="0"
      height="84"
      color="transparent"
      class="header-content-crt_exd justify-end align-end d-flex"
    )
      v-row.d-flex.align-center.justify-space-between.action-row(no-gutters)
        v-col.d-flex(cols="9")

          v-btn.add(text height="48" outlined @click="onBackToAppClick")
            span НАЗАД К ЗАЯВКЕ

          .task-name.d-flex.align-center.ml-8.mr-6 {{ task_name }}

        v-col.d-flex.justify-end(cols="3")

          .wrap-add-selected
            .selected-item.mr-8
              .selected-item-title.mr-1 Выбрано:
              .selected-item-count  {{ selected_count }} чел.

            v-btn.add.btn-blue(text height="48" outlined @click="$emit('addToSelection')")
              span добавить в подбор


</template>

<script>

export default {
  props: {
    status_alias: {
      type: String,
      default: '',
    },
    task_name: {
      type: String,
      default: '',
    },
    selected_count:{
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    contractors() {

    },
  },
  methods: {

    onBackToAppClick() {
      this.$emit('onBackToAppClick');
    }
  },
  async created() {

  }
}


</script>

<style lang="scss">

.selection-header {


  .v-toolbar__content {
    padding: 0 24px;

    .action-row {
      width: 100%;

      .task-name {
        font-weight: 600;
        font-size: 16px;
      }

      .wrap-add-selected {
        background: #E4F2FF;
        border-radius: 10px;
        padding: 8px 8px 8px 24px;
        display: flex;
        justify-content: space-between;

        .selected-item {
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;

          .selected-item-count {
            color: #0082DE;
          }

        }
      }
    }

  }


}

</style>
