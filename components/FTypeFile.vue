<template>
  <div class="wrap-form-file">
    <v-file-input
      :placeholder="params.placeholder"
      single-line
      outlined
      filled
      prepend-icon=""
      prepend-inner-icon="mdi-camera-plus-outline"
      @input="$emit('input', file)"
      v-model="file"
      @change="$emit('input', file)"
      accept="image/png, image/jpeg, image/bmp"
      hide-details="auto"
    ></v-file-input>
    <a class="form-file-link" v-if="params.original_url" :href="params.original_url" target="_blank">
      <img :src="params.preview_url" :alt="params.uuid">
    </a>
  </div>
</template>

<script>
export default {
  props: ['name', 'icon', 'params', 'value', 'label'],
  data() {
    return {
      file: [],
    }
  },
  computed: {
    icon_code() {
      if (this.icon) {
        return this.icon;
      } else {
        return null;
      }
    },
  },
  methods: {},
  created() {
    if (this.value) {
      this.file = this.value;
    }
  },
  watch: {
    value: function () {
      this.file = this.value;
    },
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.wrap-form-file{
  display: flex;

  .theme--light.v-icon {
    color: $blue;
  }

  .theme--light.v-file-input .v-file-input__text--placeholder {
    color: $blue;
    margin-left: 4px;
  }

  .form-file-link{
    display: block;
    width: 44px;
    height: 44px;
    overflow: hidden;
    font-size: 11px;
    margin-left: 16px;

    img{
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
}

</style>
