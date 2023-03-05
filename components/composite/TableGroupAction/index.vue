<template lang="pug">
  .ruqi-table-group-action
    .group-action-title Выбрано: {{ new_count }} {{ items_count }}

    .group-action-clear-handler
      a(@click.prevent="clearSelected")
        v-icon(color="#000") mdi-close

    .group-action
      v-select(
        v-model="select"
        :items="actions"
        item-text="text"
        item-value="action"
        single-line
        outlined
        filled
        @input="selectAction"
        hide-details
        label="Выберите действие"
      )


</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      default: [],
    },
    selected: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      select: '',
      new_count: '1',
    }
  },
  computed: {
    items_count() {
      if (this.selected.length == 1) {
        return 'запись';
      } else if (this.selected.length > 1 && this.selected.length < 5) {
        return 'записи';
      } else {
        return 'записей';
      }
    },
  },
  watch: {
    selected: function () {
      this.new_count = this.selected.length;
    },
  },
  methods: {
    clearSelected() {
      this.$emit('clearSelected', {array: '', value: []})
    },
    selectAction() {
      this.$emit('selectAction', this.select);

      let self = this;

      setTimeout(function() {
        self.select = null;
        this.$emit('clearSelected', {array: '', value: []})
      }, 1000);

    }
  },
  created() {
    this.new_count = this.selected.length;
  },
  mounted() {

  }
}
</script>

<style lang="scss">

.ruqi-table-group-action {
  display: flex;
  align-items: center;

  .group-action-title {
    font-weight: 600;
  }

  .group-action-clear-handler {
    margin: 0 22px 0 12px;
  }

  .v-input__control .v-input__slot .v-input__append-inner {
    margin-top: 10px !important;
  }

}

</style>
