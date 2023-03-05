<template lang="pug">

.Documentation
  .wrapper
    Document( v-for="doc in documents" :key="doc.uuid" :cntr_uuid="cntr_uuid" :doc="doc" )

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import { CONTRACTOR }                                     from '@/constants/';
  import Document from './Document.vue';

  export default {

    computed : {
      ...mapGetters( 'contractorDocs', [ 'documents', ] ),
    },

    props : {
      cntr_uuid : {
        type : String,
        required : true,
      },
    },

    components : {
      Document,
    },

    data ()
    {
      return {
        titles : {
          passport  : 'Паспорт',
          snils     : 'Снилс',
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
    },

    mounted ()
    {
      console.log( 'Documentation mounted', this.documents );
    },

  }

</script>

<style lang="scss" scoped>



</style>
