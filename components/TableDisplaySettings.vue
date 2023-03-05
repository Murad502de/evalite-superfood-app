<template lang="pug">

.table-display-settings
  SortSelect(
    :items="sort_select_items"
    @sort_select_change="handlers().onSortSelectChange( { $event } )"
  )
  SearchLine(
    @input="handlers().onSearchLineInput( { $event } )"
  )

</template>

<script>

  import SortSelect from '@/components/UI/sortSelect/SortSelect';
  import SearchLine from '@/components/UI/searchLine/SearchLine';

  export default {

    props : {
      sort_select_items : {
        type      : Array,
        required  : true,
      },
    },

    components : {
      SortSelect,
      SearchLine,
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
          onSearchLineInput : ( payload = {} ) => {
            this.$emit( 'input_search', payload.$event.target.value );
          },

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

<style lang="scss" scoped>

.table-display-settings
{
  display         : flex;
  flex-direction  : row;
  flex-wrap       : nowrap;
  align-content   : center;
  justify-content : space-between;
  align-items     : center;
  margin-bottom   : 24px;
}

</style>
