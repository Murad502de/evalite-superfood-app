<template>
  <div>
    <v-row>
      <v-col cols="12" :lg="filed.col"
             v-for="(filed, index) in meta" :key="index">
        <div class="form-part-label" :class="filed.type" v-if="filed.label">{{ filed.label }}</div>
        <div class="d-flex w-100">
          <component
            :is="filed.type"
            :name="filed.name"
            :icon="filed.icon"
            :params="filed.params"
            :validation="filed.validation"
            :value = "filed.value"
            @input="updateFiled(filed.name, $event, index, filed.parent_array)"
          />
          <a href="#" v-if="filed.remove" @click.prevent="removeItem(index, filed.parent_array)" class="remove-item">
            <img src="/img/ico_close.svg" alt="Удалить">
          </a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';

export default {

  props: ['meta',],
  data() {
    return {
      formValues: {},
    }
  },
  methods: {
    updateFiled(field, value, index, parent_array) {
      this.$emit('updateFiled', field, value, index, parent_array);
    },
    removeItem(index, parent_array) {
      this.$emit('removeItem', index, parent_array);
    }
  },
  computed: {},
  created() {
    /*this.meta.map(f => {
       Vue.set(this.formValues, f.name, null);
    })*/
  }
}
</script>

<style lang="scss" scoped>

.col-lg-0.col-12 {
  width: auto;
  flex: 0;
  padding-right: 0;
}

</style>
