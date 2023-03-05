<template lang="pug">

.back-or-confirm-edit
  .actions-wrapper
    .back-btn(
      v-if="false"
      @click="handlers().onBackClick()"
    )
      .titel {{ titles.backBtn }}
    .confirm-edit-btn( @click="handlers().onConfirmClick()" )
      .titel {{ titles.confirmBtn }}

</template>

<script>

  export default {

    components : {},

    data ()
    {
      return {
        titles : {
          backBtn : 'назад',
          confirmBtn : 'сохранить изменения',
        },
      }
    },

    methods : {
      getters ()
      {
        return {}
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {
          onBackClick : () => {
            this.$emit( 'onBackClick' );
          },

          onConfirmClick : () => {
            this.$emit( 'onConfirmClick' );
          },
        }
      },

      helpers ()
      {
        return {}
      },

      init (){},

      bindActions (){},
    }

  }

</script>

<style lang="scss" scoped>

.back-or-confirm-edit
{
  /* OBJECTS STYLES START */
    .actions-wrapper
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
    }

    .titel
    {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 125%;
      text-transform: uppercase;
    }

    .back-btn
    {
      width: 107px;
      height: 48px;
      border: 1px solid #D5DEE8;
      box-sizing: border-box;
      border-radius: 8px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 32px;

      .titel
      {
        color: #263043;
      }
    }

    .confirm-edit-btn
    {
      width: 223px;
      height: 48px;
      background: #0082DE;
      border-radius: 8px;
      //margin-left: 16px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 32px;
      cursor: pointer;

      .titel
      {
        color: #FFFFFF;
      }
    }
  /* OBJECTS STYLES END */
}

</style>
