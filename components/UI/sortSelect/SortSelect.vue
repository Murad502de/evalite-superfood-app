<template lang="pug">

.sort-select
  v-select.item(
    :items="items"
    item-text="name"
    item-value="uuid"
    @change="handlers().onSortSelectChange( { $event } )"
    prefix="Сортировка:"
    solo
  )

</template>

<script>

  export default {

    components : {},

    props : {
      "items" : {
        type      : Array,
        required  : true,
      },
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
          onSortSelectChange : ( payload = {} ) => {
            this.$emit( 'sort_select_change', payload.$event );
          }
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

/* OBJECTS STYLES START */
  .sort-select
  {
    .item
    {
      width   : 245px;
      height  : 44px;

      .v-input__slot
      {
        margin        : 0 !important;
        background    : #FFFFFF;
        border        : 1px solid #D5DEE8 !important;
        box-sizing    : border-box;
        border-radius : 10px;
        box-shadow    : unset !important;
      }
    }
  }
/* OBJECTS STYLES END */

</style>
