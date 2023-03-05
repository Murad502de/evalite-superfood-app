<template lang="pug">

.switcher-ui-container
  .switcher-ui__wrapper
    .switcher
      input.scwitcher__checkbox(
        type="checkbox"
        :id="id"
        :checked="stay"
        @change="handlers().onChange()"
      )
      label.switcher__label( :for="id" )
    .switcher-titel( v-if="label" ) {{ label }}

</template>

<script>

  export default {

    components : {},

    props : {
      id : {
        type : String,
        required : true
      },

      stay : {
        type : Boolean,
        required : true
      },

      label : {
        type : String,
        default : ""
      },
    },

    data ()
    {
      return {
      }
    },

    computed : {},

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
          onChange : () => {
            this.$emit( 'change', this.id );
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

.switcher-ui-container
{
  /* OBJECTS STYLES START */
    .switcher-ui__wrapper
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
    }

    .switcher {
      height  : 28px;
      width   : 48px;

      .scwitcher__checkbox {
        display: none;
      }

      .switcher__label {
          cursor: pointer;
          font-size: 20px;
          line-height: 28px;
          position: relative;

          &::after {
              content: "";
              width: 48px;
              height: 28px;
              background: #E9E9EA;
              border-radius: 99px;
              position: absolute;
              transition-duration: 330ms;
              left: 0px;
          }

          &::before {
            content: "";
            width: 21px;
            height: 21px;
            position: absolute;
            z-index: 1;
            background: #FFFFFF;
            //border: 1px solid #9FA2B4;
            border-radius: 50%;
            box-sizing: border-box;
            //box-shadow: 0px 0.1px 0.3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.2);
            transition-duration: 300ms;
            left: 3px;
            top: 3px;
          }
      }

      .scwitcher__checkbox:checked + .switcher__label::before {
        left: 23px;
      }

      .scwitcher__checkbox:checked + .switcher__label::after {
        background: #0082DE;
      }
    }

    .switcher-titel
    {
      margin-left: 16px;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #263043;
    }
  /* OBJECTS STYLES END */
}

</style>
