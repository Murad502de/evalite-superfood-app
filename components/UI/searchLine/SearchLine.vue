<template lang="pug">

.search-line
  .wrapper
    img.search-logo( src="@/assets/img/search.svg" )
    input.search-line-item(
      placeholder="Найти"
      @input="$emit( 'input', $event )"
    )

</template>

<script>

  export default {

    components : {},

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
        return {}
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

.search-line
{
  display         : flex;
  flex-direction  : column;
  flex-wrap       : nowrap;
  align-content   : flex-start;
  justify-content : center;
  align-items     : flex-start;

  width       : 264px;
  height      : 44px;
  background  : #FFFFFF;
  padding     : 13px 27px;

  border        : 1.5px solid #D5DEE8;
  box-sizing    : border-box;
  border-radius : 50px;
  .wrapper
  {
    display         : flex;
    flex-direction  : row;
    flex-wrap       : nowrap;
    align-content   : center;
    justify-content : flex-start;
    align-items     : center;

    .search-logo
    {
      width   : 18px;
      height  : 18px;
    }

    .search-line-item
    {
      outline : none;
    }
  }
}

</style>
