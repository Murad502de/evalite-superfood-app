<template lang="pug">

.general-info__tab
  .wrapper
    PersonalData.personal-data__block
    ProfileAppearance.profile-appearance__block

</template>

<script>

  import PersonalData       from './PersonalData';
  import ProfileAppearance  from './ProfileAppearance';

  export default {

    components : {
      PersonalData,
      ProfileAppearance,
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

<style lang="scss">

.general-info__tab
{
  /* OBJECTS STYLES START */
    .personal-data__block
    {
      margin-bottom: 32px;
    }
  /* OBJECTS STYLES END */
}

</style>
