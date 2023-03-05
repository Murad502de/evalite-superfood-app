<template>
  <div class="form-select-uuid">
    <v-select
      v-model="select"
      :id="id"
      :items="options"
      :item-text="item_text_v"
      :item-value="item_value"
      :rules="[v => !!v || 'Выберите вариант']"
      required
      single-line
      outlined
      filled
      @input="$emit('input', select)"
      :hide-details="hideDetails"
      :prepend-inner-icon="icon_code"
      :label="params.label"
      :readonly="readonly"
      :multiple="multiple"
      ref="vSelect"
    >
      <template v-slot:selection="{ item, index }" v-if="multiple">
        <v-chip v-if="index === 0">
          <span>{{ item[item_text_v] }}</span>
        </v-chip>
        <span
          v-if="index === 1"
          class="grey--text text-caption"
        >
          (+{{ select.length - 1 }})
        </span>
      </template>

      <template v-slot:append-item v-if="multiple">
        <div class="list-actions">
          <v-btn class="btn-grey add btn-confirm btn-ok" @click="toggle">
            Выбрать все
          </v-btn>
          <v-btn class="btn-blue add btn-confirm btn-ok" @click="close">
            ок
          </v-btn>
        </div>
      </template>


    </v-select>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'icon', 'params', 'item_text', 'value'],
  computed: {
    options() {
      return this.params.options
    },
    item_text_v() {
      return this.params.item_text
    },
    item_value() {
      if (this.params && this.params.item_value) {
        return this.params.item_value;
      } else {
        return 'uuid';
      }
    },
    icon_code() {
      if (this.icon) {
        return this.icon;
      } else {
        return null;
      }
    },
    readonly() {
      if (this.params && this.params.readonly) {
        return true;
      } else {
        return false;
      }
    },
    multiple() {
      if (this.params && this.params.multiple) {
        return true;
      } else {
        return false;
      }
    },
    hideDetails() {
      if (this.params && this.params.hideDetails) {
        return this.params.hideDetails;
      } else {
        return 'auto';
      }
    }
  },
  data() {
    return {
      select: '',
    }
  },
  watch: {
    value: function () {
      this.select = this.value;
    },
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.select.length != this.options.length) {
          this.select = this.options.slice();
        } else {
          this.select = [];
        }
        this.$emit('input', this.select);
      })
    },
    close() {
      const searchEl = this.$refs.vSelect;
      if (searchEl) {
        searchEl.blur();
      }
    }
  },
  created() {
    if (this.value) {
      this.select = this.value;
    }
  }
}
</script>

<style lang="scss">
.ruqi {

  .form-select-uuid {

    .v-select__selections{
      flex-wrap: nowrap;
    }

    .theme--light.v-chip {
      background: transparent;
      padding: 0;

      &:before{
        display: none;
      }
    }
  }

  .v-input__prepend-inner {
    margin-top: 10px;
  }

  .v-select__selection--comma {
    color: #263043;
  }

  .list-actions {
    display: flex;
    flex-direction: column;
    padding: 8px;

    .btn-confirm {
      min-width: 100%;
      margin: 0 0 8px 0;
      font-weight: 700;
      border-radius: 8px;
      text-transform: uppercase;
      font-size: 14px;
      background: #0082DE;
      color: white;
      border: none;
      box-shadow: none;
      height: 48px;

      &.btn-grey {
        border: 1px solid #E0E0E0;
        color: #263043;
        background: #fff;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

  }

}

</style>
