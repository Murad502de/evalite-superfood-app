<template lang="pug">
  .form-button(:class="[params.style]")
    v-btn(@click="submit")
      v-icon(v-if="params.icon") {{ icon }}
      span {{ text }}

</template>

<script>
export default {
  props: ['name', 'params',],
  data() {
    return {
      isActive: false,
      isApply: false,

    }
  },
  computed: {
    text(){
      if (this.params && this.params.text_action && this.isActive) {
        return this.params.text_action;
      } else {
        return this.params.text;
      }
    },

    icon(){
      if (this.params && this.params.icon_action && this.isActive) {
        return this.params.icon_action;
      } else if (this.params && this.params.icon){
        return this.params.icon;
      }
    },
  },
  watch: {
    params: {
      handler(val) {
        this.isApply = this.params.is_apply;
      },
      deep: true
    },
  },
  methods: {
    submit(){
      this.isActive = !this.isActive;
      this.$emit('input', this.isActive);
    }

  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi{
  .form-button{

    .v-btn{
      width: 100%;
      height: 48px;
      box-shadow: none;
      font-weight: 700;
      font-size: 14px;
      background: #0082DE;
      color: #fff;
      border-radius: 8px;

      .v-icon{
        margin-right: 8px;
      }

    }

    &.outline{

       .v-btn{
         background: transparent;
         color: #0082DE;
         border: 1.5px solid #0082DE;
       }

     }

    &.grey-noborder{

      .v-btn{
        background: transparent;
        color: transparent;
        border: none;
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;

        &:hover{
          background: transparent;
          color: transparent;
        }

        &:before{
          display: none !important;
        }

          span{
            color: #7A91A9;
          }

          .v-ripple__container{
            display: none !Important;
          }

      }

    }
  }
}



</style>
