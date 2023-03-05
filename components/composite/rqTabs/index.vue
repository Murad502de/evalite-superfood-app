<template lang="pug">
.rq-tabs
  v-tabs(v-model="activeTab", show-arrows)
    v-tab.rq-tabs__title(v-if="node", @click="onRqTabClicked({ item: node })") {{ node.name }}
    v-tab(
      v-for="(item, index) in items",
      :key="item.index",
      v-if="!item.isNode",
      :class="['rq-tabs__tab']",
      active-class="rq-tabs__tab_active",
      @click="onRqTabClicked({ item })"
    )
      .rq-tabs__tab-main
        slot(name="item", :item="item")
      .rq-tabs__tab-actions(@click.stop="onActionClicked({ item })")
        rqIcon(
          v-if="item.isPinned",
          name="clip",
          width="15",
          height="15",
          viewBox="0 0 17 17",
          fill="#666666"
        )
        rqIcon(
          v-else,
          name="close",
          width="15",
          height="15",
          viewBox="0 0 12 12",
          fill="#666666"
        )
</template>

<script>
import rqIcon from "@/components/UI/rqIcon";

export default {
  components: {
    rqIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    activeTab: {
      get() {
        return this.items.findIndex((item) => item.isActive);
      },
      set() {},
    },

    node() {
      const filteredItems = this.items.filter((item) => item.isNode);

      return filteredItems.length ? filteredItems[0] : null;
    },
  },
  methods: {
    // getters
    // setters

    /* HANDLERS */
    onRqTabClicked({ item }) {
      this.$emit("onRqTabClicked", { item });
    },
    onActionClicked({ item }) {
      console.debug("onActionClicked", item);

      if (item.isPinned) {
        this.$emit("unpinRqTab", { item });
      } else {
        this.$emit("closeRqTab", { item });
      }
    },

    // helpers
  },

  data() {
    return {
      rqTab: true,
    };
  },
};
</script>

<style lang="scss">
.rq-tabs {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;

  &__title {
    font-family: "Source Sans Pro" !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    line-height: 125% !important;
    color: #000000 !important;
    white-space: nowrap !important;
    text-transform: none !important;
  }
  &__tab {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 24px;
    height: 60px;
    cursor: pointer;

    &-main {
    }
    &-actions {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
    }
    &_active {
      background: linear-gradient(0deg, #f1f8ff, #f1f8ff), #e2ecf5;
      // border-bottom: 2px solid #0082DE;
    }
  }

  .v-tabs-bar {
    border-bottom: 0 !important;
    height: 60px;
  }
}
</style>
