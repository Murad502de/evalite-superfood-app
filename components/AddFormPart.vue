<template>
  <div class="button-add-form-part" @click="addFormPart">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ['text',],
  data() {
    return {}
  },
  methods: {
    addFormPart(){
      this.$emit('addFormPart');
    },
  }
}
</script>

<style lang="scss" scoped>

@import '/assets/scss/colors.scss';

.button-add-form-part{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #E9F6FF;
  color: $blue;
  padding: 32px;
  margin: 32px 0;
  border-radius: 10px;
  border: 1px dashed #0082DE;
  cursor: pointer;
}

</style>
