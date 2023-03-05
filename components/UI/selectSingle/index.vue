<template lang="pug">

.select-single
  .select-single_titel( v-if="title" ) {{ title }}
  v-select(
    :value="value"
    :id="id"
    :items="items"
    item-text="name"
    item-value="uuid"
    :rules="[v => !!v || 'Выберите вариант']"
    required
    single-line
    outlined
    filled
    @change="handlers().onSelectChange({ $event, id })"
    hide-details="true"
    :item-color="'#000000'"
  )

</template>

<script>
export default {
  props: {
    'id': {
      type: String,
      required: true,
    },

    'title': {
      type: String,
      default: "",
    },

    'items': {
      type: Array,
      required: true,
    },

    'value': {
      type: String,
      default: "",
    },
  },

  computed: {},

  data() {
    return {
      selected: null,
    }
  },

  methods: {
    getters() { },

    handlers() {
      return {
        onSelectChange: (payload = {}) => {
          console.log('onSelectChange', payload);

          this.$emit(
            'change',

            {
              ctx: payload.$event,
              id: payload.id,
            }
          );
        },
      }
    }
  },

  mounted() {
    console.log('items vv', this.items);
  },
}
</script>

<style lang="scss">
.select-single {

  /* OBJECTS STYLES START */
  .select-single_titel {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #263043;
    margin-bottom: 16px;
    white-space: nowrap;
  }

  /* OBJECTS STYLES END */
}
</style>
