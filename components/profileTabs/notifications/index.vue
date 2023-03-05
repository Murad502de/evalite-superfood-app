<template lang="pug">

.notifications__tab
  .notifications__wrapper
    .notifications__header
      .notifications__haupt-titel {{ hauptTitel }}
    .notifications__body
      .notifications__wrapper__body
        Switcher.mix-switcher__mb(
          :id="events.notification_new_task.uuid"
          :stay="user.settings.notification_new_task"
          :label="events.notification_new_task.label"
          @change="setters().setEventSwitcherStatus( { $event } )"
        )
        Switcher.mix-switcher__mb(
          :id="events.notification_new_object.uuid"
          :stay="user.settings.notification_new_object"
          :label="events.notification_new_object.label"
          @change="setters().setEventSwitcherStatus( { $event } )"
        )
        Switcher.mix-switcher__mb(
          :id="events.notification_low_time.uuid"
          :stay="user.settings.notification_low_time"
          :label="events.notification_low_time.label"
          @change="setters().setEventSwitcherStatus( { $event } )"
        )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import Switcher from '@/components/UI/switcher';

  export default {
    components : {
      Switcher,
    },

    data ()
    {
      return {
        hauptTitel : 'Уведомлять о событиях',
        switch1: true,
        switch2: false,

        events : {
          notification_new_task : { uuid : 'notification_new_task', status : true, label : "Доступна новая заявка на объекте", },
          notification_new_object : { uuid : 'notification_new_object', status : true, label : "Появился новый объект в моем месте", },
          notification_low_time : { uuid : 'notification_low_time', status : false, label : "Заканчивается время набора на заявку", },
        },

      }
    },

    computed : {
      ...mapGetters( 'user', [ 'user', ] ),
    },

    methods : {
      ...mapActions( 'user', [ 'setUserData', ] ),

      getters ()
      {
        return {}
      },

      setters ()
      {
        return {
          setEventSwitcherStatus : ( payload = {} ) => {
            this.setUserData(
              {
                settings : {
                  ...this.user.settings,

                  [ payload.$event ] : !this.user.settings[ payload.$event]
                }
              }
            );
          },
        }
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

.notifications__tab
{
  /* OBJECTS STYLES START */
    .notifications__wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .notifications__header {
        margin-bottom: 24px;
      }

      .notifications__body
      {
        .notifications__wrapper__body
        {
          width: 533px;
        }
      }
    }

    .notifications__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .mix-switcher__mb
    {
      margin-bottom: 24px;

      &:last-child{
        margin-bottom: 0px;
      }
    }
  /* MIXINS STYLES END */
}

</style>
