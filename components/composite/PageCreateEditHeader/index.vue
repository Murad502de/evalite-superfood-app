<template lang="pug">
  .page-create-header
    v-row.d-flex.pa-6.align-center.action-row(no-gutters)
      v-col(cols="10")
        .header-dialog {{ header_text}}

      v-col.d-flex.justify-end(cols="2")
        v-btn.btn-blue.add(text :disabled="disabled" height="48" outlined @click="$emit('createAction')")
          span {{ button_text }}

        v-btn.add.ml-4(text height="48" outlined @click="$emit('closeAction')")
          span закрыть

</template>

<script>


export default {
  props: {
    header_text: {
      type: String,
      default: '',
    },
    button_text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: true,
    }

  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">

.page-create-header{
  .action-row {
    background: #fff;

    .header-dialog {
      font-weight: 600;
      font-size: 20px;
    }

    .v-btn{
      min-width: 136px;
    }
  }


}


</style>
