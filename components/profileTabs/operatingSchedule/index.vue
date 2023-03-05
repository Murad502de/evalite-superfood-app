<template lang="pug">

.operating-schedule-tab__container
  .operating-schedule-tab__wrapper
    .operating-schedule-tab__header
      .operating-schedule-tab__haupt-titel {{ hauptTitel }}
    .operating-schedule-tab__body
      .operating-schedule-tab__wrapper__body
        .operating-schedule-tab__description.desc1 {{ descriptions.desc1 }}

        v-checkbox.work-days(
          label="2 через 2"
          color="info"
          :input-value="user.work_times.two"
          hide-details
          @change="setters().SetTwo( { $event } )"
        )

        v-checkbox.work-days(
          label="3 через 3"
          color="info"
          :input-value="user.work_times.three"
          hide-details
          @change="setters().SetThree( { $event } )"
        )

        v-checkbox.work-days(
          label="индивидуальный"
          color="info"
          :input-value="user.work_times.individual"
          hide-details
          @change="setters().SetIndividual( { $event } )"
        )

        .individual-days
          .individual-day(
            v-for="( individualDay, index ) in individualDays" :key="index"
          )
            v-checkbox(
              :label="individualDay.day"
              color="info"
              :input-value="user.work_times[ individualDay.slug ]"
              hide-details
              @change="setters().SetIndividualDay( { $event, day : individualDay.slug } )"
            )

        .dont-invite-weekends-holidays
          v-checkbox.dont-invite-weekends-holidays__item(
              :label="checkboxLabels.dontInviteWeekendsHolidays"
              color="info"
              :input-value="user.work_times.weekend"
              hide-details
              @change="setters().SetWeekend( { $event } )"
            )
          .operating-schedule-tab__description {{ descriptions.desc2 }}

        .operating-schedule-time
          .operating-schedule-time__title Время
          .time-period
            .time-from.indent-left {{ timePeriod.from }}
            FTypeTime.time-punkt.indent-left(
              :value="user.work_times.start_date"
              @input="setters().SetTimeFrom( { $event } )"
            )

            .time-from.indent-left {{ timePeriod.to }}
            FTypeTime.time-punkt.indent-left(
              :value="user.work_times.end_date"
              @input="setters().SetTimeTo( { $event } )"
            )

        .dont-invite-to-night-shifts
          v-checkbox.dont-invite-to-night-shifts__item(
              :label="checkboxLabels.dontInviteToNightShifts"
              color="info"
              :input-value="user.work_times.night_shift"
              hide-details
              @change="setters().SetNightShift( { $event } )"
            )
          .operating-schedule-tab__description {{ descriptions.desc3 }}


</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';

  export default {

    components : {},

    data ()
    {
      return {
        hauptTitel : 'Желаемый график работ',

        checkboxLabels : {
          dontInviteWeekendsHolidays : 'не приглашать в выходные и праздничные дни',
          dontInviteToNightShifts : 'не приглашать в ночные смены',
        },

        descriptions : {
          desc1 : 'Укажите дни, в которые вы хотели бы получать приглашения в заявки',
          desc2 : 'Мы не будем приглашать вас на объекты во время официальных праздников и выходных',
          desc3 : 'Мы не будем приглашать в вас на заявки, время работы которых попадает в промежуток 22:00 – 06:00',
        },

        individualDays : [
          {
            day : 'пн',
            slug : 'monday',
          },

          {
            day : 'вт',
            slug : 'tuesday',
          },

          {
            day : 'ср',
            slug : 'wednesday',
          },

          {
            day : 'чт',
            slug : 'thursday',
          },

          {
            day : 'пт',
            slug : 'friday',
          },

          {
            day : 'сб',
            slug : 'saturday',
          },

          {
            day : 'вс',
            slug : 'sunday',
          },
        ],

        timePeriod : {
          from : 'с',
          to : 'до',
        },
      }
    },

    computed : {
      ...mapGetters( 'user', [ 'user', ] ),
    },

    methods : {
      ...mapActions( 'user', [ 'setUserData', 'resetUserWorkTimeDaysStore', ] ),

      getters ()
      {
        return {}
      },

      setters ()
      {
        return {
          SetTwo : async ( payload = {} ) => {
            this.resetUserWorkTimeDaysStore().then(
              () => {
                this.setUserData( { work_times : { ...this.user.work_times, two : payload.$event } } );
              }
            );
          },

          SetThree : async ( payload = {} ) => {
            this.resetUserWorkTimeDaysStore().then(
              () => {
                this.setUserData( { work_times : { ...this.user.work_times, three : payload.$event } } );
              }
            );
          },

          SetIndividual : async ( payload = {} ) => {
            this.resetUserWorkTimeDaysStore().then(
              () => {
                this.setUserData( { work_times : { ...this.user.work_times, individual : payload.$event } } );
              }
            );
          },

          SetIndividualDay : async ( payload = {} ) => {
            console.log( "SetIndividual", payload ); // DELETE

            let days = {
              monday    : this.user.work_times.monday,
              tuesday   : this.user.work_times.tuesday,
              wednesday : this.user.work_times.wednesday,
              thursday  : this.user.work_times.thursday,
              friday    : this.user.work_times.friday,
              saturday  : this.user.work_times.saturday,
              sunday    : this.user.work_times.sunday,
            }

            this.resetUserWorkTimeDaysStore().then(
              () => {
                this.setUserData(
                  {
                    work_times : {
                      ...this.user.work_times,
                      individual : true,
                      ...days,
                      [ payload.day ] : payload.$event,
                    }
                  }
                );
              }
            );
          },

          SetWeekend : async ( payload = {} ) => {
            this.setUserData( { work_times : { ...this.user.work_times, weekend : payload.$event } } );
          },

          SetTimeFrom : async ( payload = {} ) => {
            console.log( "SetTimeFrom", payload ); // DELETE

            this.setUserData( { work_times : { ...this.user.work_times, start_date : payload.$event } } );
          },

          SetTimeTo : async ( payload = {} ) => {
            console.log( "SetTimeTo", payload ); // DELETE

            this.setUserData( { work_times : { ...this.user.work_times, end_date : payload.$event } } );
          },

          SetNightShift : async ( payload = {} ) => {
            this.setUserData( { work_times : { ...this.user.work_times, night_shift : payload.$event } } );
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
    },

  }

</script>

<style lang="scss">

.operating-schedule-tab__container
{
  /* OBJECTS STYLES START */
    .operating-schedule-tab__wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .operating-schedule-tab__header {
        margin-bottom: 24px;
      }

      .operating-schedule-tab__body
      {
        .operating-schedule-tab__wrapper__body
        {
          width: 533px;
        }
      }
    }

    .operating-schedule-tab__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .operating-schedule-tab__description
    {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #7A91A9;
      margin-bottom: 24px;
    }
    .work-days
    {
      margin-bottom: 24px;
    }

    .individual-days
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 32px;

      .individual-day
      {
        background: #FFFFFF;
        border: 1px solid #E2E4E5;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 15px;
        margin-right: 16px;

        &:last-child
        {
          margin-right: 0;
        }
      }
    }

    .dont-invite-weekends-holidays
    {
      .dont-invite-weekends-holidays__item
      {
        margin-bottom: 10px;
      }
    }

    .operating-schedule-time
    {
      margin-bottom: 20px;

      .operating-schedule-time__title
      {
        font-weight: 600;
        font-size: 16px;
        line-height: 125%;
        color: #263043;
      }
    }

    .dont-invite-to-night-shifts
    {
      .dont-invite-to-night-shifts__item
      {
        margin-bottom: 10px;
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .desc1
    {
      margin-bottom: 32px;
    }

    .v-input--selection-controls
    {
      margin-top  : 0 !important;
      padding-top : 0 !important;
    }

    .time-period
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;

      margin-top: 16px;

      .time-punkt
      {
        fieldset
        {
          background: #FFFFFF !important;
          border: 1px solid #E2E4E5 !important;
          box-sizing: border-box !important;
          border-radius: 4px !important;
        }
      }

      .indent-left
      {
        margin-left: 10px;

        &:first-child
        {
          margin-left: 0px;
        }
      }
    }
  /* MIXINS STYLES END */
}

</style>
