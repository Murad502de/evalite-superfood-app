<template lang="pug">

.average-rate
  .wrapper
    .header
      h3.titel {{ titles.header }}

    .body
      .rate
        .value( v-if="!!contractor.avg_price" ) {{ `${ contractor.avg_price } p.` }}
        v-skeleton-loader(
          v-else
          width="200"
          height="30px"
          type="text"
        )

      .histograms
        .wrapper
          .item( v-for="price in contractor.avg_price_detailed" :key="price.payment" )
            .histogram( :style="{ height : `${ ( Number( price.payment ) / Number( contractor.avg_price ) ) * 100 }%` }" )
              .value {{ price.payment }}

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {

    components : {},

    computed : {
      ...mapGetters( 'contractors', [ 'contractor', ] ),
    },

    data ()
    {
      return {
        titles : {
          header  : 'Средняя ставка',
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

/* OBJECTS STYLES START */
  .average-rate
  {
    background      : #FFFFFF;
    border          : 1px solid #E0E0E0;
    box-sizing      : border-box;
    border-radius   : 30px;
    padding         : 24px;

    .wrapper
    {
      .header
      {
        margin-bottom : 11px;

        .titel
        {
          font-weight : bold;
          font-size   : 22px;
          line-height : 125%;
          color       : #263043;
        }
      }

      .body {
        .histograms
        {
          height  : 150px;

          .wrapper
          {
            display         : flex;
            flex-direction  : row;
            flex-wrap       : nowrap;
            align-content   : center;
            justify-content : flex-start;
            height          : 100%;

            .item
            {
              display         : flex;
              flex-direction  : column;
              flex-wrap       : nowrap;
              align-content   : flex-start;
              justify-content : flex-end;
              margin-right    : 8px;

              &:last-child
              {
                margin-right  : 0;
              }
            }
          }
        }
      }
    }
  }

  .rate
  {
    margin-bottom : 11px;

    .value
    {
      font-style  : normal;
      font-weight : 600;
      font-size   : 40px;
      line-height : 125%;
      color       : #0082DE;
    }
  }

  .histogram
  {
    display         : flex;
    flex-direction  : column;
    flex-wrap       : nowrap;
    align-content   : center;
    justify-content : flex-end;
    align-items     : center;
    background      : #F2F4F5;
    border-radius   : 40px;
    width           : 25px;
    height          : 150px;
    padding         : 10px;

    .value
    {
      font-weight : 600;
      font-size   : 16px;
      line-height : 125%;
      color       : #263043;
      transform   : rotate( -90deg );
    }
  }
/* OBJECTS STYLES END */

</style>
