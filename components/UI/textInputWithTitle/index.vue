<template lang="pug">

.text-input-with-title
  .haupt-titel {{ title }}
  .eingabe
    input.object( :value="value" )

</template>

<script>

  export default {

    components : {},

    props : {
      title : {
        type : String,
        default : "",
      },

      value : {
        type : String,
        default : "",
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

.text-input-with-title
{
  /* OBJECTS STYLES START */
    .haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #263043;
      margin-bottom: 16px;
    }

    .eingabe
    {
      .object
      {
        height: 48px;
        width: 100%;
        background: #FFFFFF;
        border: 1px solid #E2E4E5;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 10px 16px;
        outline : none;
      }
    }
  /* OBJECTS STYLES END */
}

</style>
