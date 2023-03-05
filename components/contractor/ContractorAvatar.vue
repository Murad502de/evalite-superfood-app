<template>
  <div class="user-plate">
    <div class="user-avatar-wrapper">
      <v-avatar
        :color="color"
        size="66"
        class="user-profilbild"
      >
        <span class="title">{{ initials }}</span>
      </v-avatar>
    </div>
  </div>


</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    props : {
      first_name          : { type : String, default : '' },
      last_name           : { type : String, default : '' },
      color               : { type : String, default : '#D6D0FE' },
    },

    data ()
    {
      return {}
    },

    computed : {
      ...mapGetters( 'performersDetailing', [ 'isDialogOpen', ] ),
      ...mapGetters( 'contractors', [ 'contractor', ] ),

      firstChar ()
      {
        if (this.first_name && this.first_name.length > 1) {
          return this.first_name.substr(0, 1)
        }
        else{
          return '';
        }
      },

      secondChar ()
      {
        if (this.last_name && this.last_name.length > 1) {
          return this.last_name.substr(0, 1)
        }
        else{
          return '';
        }
      },

      initials ()
      {
        return this.firstChar + this.secondChar;
      },
    },

    methods : {
      ...mapActions( 'performersDetailing', [ 'setStateDialog', ] ),
      ...mapActions( 'contractors', [ 'getContractor', ] ),

      handlers ()
      {
        return {
          onUserNameClick : ( params = {} ) => {
            if ( this.ist_detail_erlaubt )
            {
              console.debug( 'onUserNameClick' );

              this.setStateDialog( true );

              console.debug( 'isDialogOpen after set: ' + this.isDialogOpen );

              this.getContractor( this.uuid );
            }
          },
        }
      },
    },

    mounted () {},
  }

</script>

<style lang="scss" scoped>

/* OBJECTS STYLES START */
  .user-profilbild
  {
    border-radius : 100% !important;

    .title
    {
      font-style  : normal;
      font-weight : 500;
      font-size   : 16px;
      color       : #FFFFFF;
    }
  }
/* OBJECTS STYLES END */

</style>
