<template>

  <div class="bewertung">
    <div class="wrapper">
      <div class="icon">
        <v-icon class="ic-item">mdi-star</v-icon>
      </div>

      <div class="wert">
        4.5
      </div>
    </div>
  </div>

</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  // {{ contractor.rating }}

  export default {

    computed: {
      ...mapGetters( 'contractors', [ 'contractor', ] ),
    }
  }

</script>

<style lang="scss" scoped>

/* OBJECTS STYLES START */
  .bewertung {
    background    : #FFFFFF;
    border        : 1px solid #E0E0E0;
    box-sizing    : border-box;
    box-shadow    : 0px 6px 73px rgba(0, 0, 0, 0.07);
    border-radius : 15px;

    .wrapper {
      display         : flex;
      flex-direction  : row;
      flex-wrap       : nowrap;
      align-content   : center;
      justify-content : center;
      align-items     : center;
      padding         : 0px 12px;

      .icon {
        .ic-item {
          color : gold;
        }
      }

      .wert {
        font-weight : 600;
        font-size   : 16px;
        line-height : 125%;
        margin-left : 8px;
        color       : #7A91A9;
      }
    }
  }
/* OBJECTS STYLES END */

</style>
