<template lang="pug">
  .confirm
    v-dialog(v-model="isOpenModal" max-width="328" persistent)
      v-card.confirm-window
        v-card-title {{ content.title }}
        v-card-text {{ content.description }}
        v-card-actions
          v-spacer
          v-btn.btn-blue.add.btn-confirm.btn-ok(outlined @click="confirmRemove(1)")  {{ content.text_btn_ok }}
          v-btn.btn-grey.add.btn-confirm.btn-cancel(outlined @click="confirmRemove(0)")  {{ content.text_btn_cancel }}

</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: {},
    },
    isConfirmModal: {
      type: [Boolean, Number],
      default: false
    },
  },
  data() {
    return {
      isOpenModal: false,

    }
  },
  computed: {},
  watch: {
    isConfirmModal: function () {
      this.isOpenModal = this.isConfirmModal;
    },
  },
  methods: {
    confirmRemove(confirm) {
      this.$emit('confirmRemove', confirm);
    },

  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.v-dialog {
  .confirm-window {

    .v-card__title {
      font-weight: 700 !important;
      font-size: 19px !important;
      justify-content: center;
    }

     .v-card__text{
       font-weight: 400;
       font-size: 14px;
       line-height: 20px;
       text-align: center;
     }

    .v-card__actions {
      flex-direction: column;

      .btn-confirm {
        min-width: 100%;
        margin: 0 0 16px 0;
        font-weight: 700;
        border-radius: 8px;
        text-transform: uppercase;
        font-size: 14px;
        height: 42px;

        &.btn-grey {
          border: 1px solid #E0E0E0;
          color: $grey;
        }
      }

    }
  }
}


</style>
