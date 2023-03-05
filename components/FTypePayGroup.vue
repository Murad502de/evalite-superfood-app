<template>
    <v-row class="d-flex w-100">
      <v-col cols="12" :lg="item.col"
             v-for="(item, index) in meta_object_pay_fields" :key="index">
        <div class="form-part-label" v-if="item.label">{{ item.label }}</div>
        <div class="d-flex w-100">
          <component
            :is="item.type"
            :name="item.name"
            :icon="item.icon"
            :params="item.params"
            @input="updateFiled(item.name, $event)"
          />
          <a href="#" v-if="item.remove" @click.prevent="removeItem(index)" class="remove-item">
            <img src="/img/ico_close.svg" alt="Удалить">
          </a>
        </div>
      </v-col>
    </v-row>
</template>

<script>
export default {
  props: ['id', 'name', 'icon'],
  data() {
    return {
      value: '',
      meta_object_pay_fields: [
        {
          type: 'FTypeText',
          label: '',
          icon: '',
          col: 5,
          id: 'object_pay_title',
          name: 'object_pay_title',
          remove: false,
        },
        {
          type: 'FTypeText',
          label: '',
          icon: '',
          col: 2,
          id: 'object_pay_time',
          name: 'object_pay_time',
          remove: false,
        },
        {
          type: 'FTypeSelect',
          label: '',
          col: 3,
          id: 'object_pay_time',
          name: 'object_pay_time',
          params: {
            options: [
              'за смену',
              'за час',
            ],
          }
        },
        {
          type: 'FTypeText',
          label: '',
          icon: '',
          col: 2,
          id: 'object_pay_cw',
          name: 'object_pay_cw',
          remove: false,
        },
      ],
    }
  },
  computed: {
    icon_code() {
      if (this.icon){
        return this.icon;
      }
      else{
        return null;
      }
    },
  },
  methods: {
    updateFiled(field, value) {
      this.$emit('updateFiled', field, value);
    },
    removeItem(index) {
      this.$emit('removeItem', index);
    }
  },
  created() {
  }
}
</script>

<style lang="scss">


</style>
