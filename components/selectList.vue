<template lang="pug">

.select-list__container
  .select-list__wrapper
    .select-list__header
      .select-list__haupt-titel {{ title }}
    .body
      .wrapper__body
        .container-list
          .select-list__item(
            v-for="( item, index ) in items" :key="index"
          )
            selectSingle(
              :id="item.uuid"
              :items="options"
              :value="item.uuid"
              @change="handlers().onSelectSingleChange( { $event } )"
            )
            img.del-logo(
              src="/img/ico_close.svg"
              alt="Удалить"
              @click="handlers().deleteItem( { uuid : item.uuid } )"
            )
        .container-actions
          .action-add
            .titel( @click="handlers().addItem()" ) {{ action_add_title }}


</template>

<script>

  import selectSingle from '@/components/UI/selectSingle';

  export default {
    props : {
      title : {
        type : String,
        default : "",
      },

      action_add_title : {
        type : String,
        default : "Добавить",
      },

      options : {
        type : Array,
        required : true,
      },

      items : {
        type : Array,
        default : [],
      },
    },

    components : {
      selectSingle,
    },

    data ()
    {
      return {}
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
          addItem : ( payload = {} ) => {
            this.$emit( 'addItem' );
          },

          deleteItem : ( payload = {} ) => {
            this.$emit( 'deleteItem', payload );
          },

          onSelectSingleChange : ( payload = {} ) => {
            console.log( "onSelectSingleChange", payload );

            this.$emit(
              'select-list-change',

              {
                uuidOption : payload.$event.ctx,
                uuidItem : payload.$event.id,
              }
            );
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

<style lang="scss">

.select-list__container
{
  /* OBJECTS STYLES START */
    .select-list__wrapper
    {
      .select-list__header
      {
        margin-bottom: 16px;
      }

      .body
      {}
    }

    .select-list__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #263043;
    }

    .container-list
    {
      .select-list__item
      {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 24px;

        .select-single
        {
          width : 416px;
        }

        fieldset
        {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }

      .del-logo
      {
        margin-left: 18px;
        cursor: pointer;
      }
    }

    .container-actions
    {
      .action-add
      {
        cursor: pointer;

        .titel
        {
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 125%;
          color: #0082DE;
        }
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .v-select__selection.v-select__selection--comma, .v-icon.notranslate.mdi
    {
      color : #000000!important;
    }
  /* MIXINS STYLES END */
}

</style>
