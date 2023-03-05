<template lang="pug">

.personal-data__tab
  .wrapper
    .header
      .haupt-titel {{ hauptTitel }}
    .body
      .wrapper__body
        .haupt-data
          Input.mix-input.haupt-data__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.firstname, value : user.firstname, rules : rules.firstname, ref : 'personaldatatab_firstname', }"
            @input_change="setters().setFirstName( { event : $event } )"
          )
          Input.mix-input.haupt-data__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.secondname, value : user.middlename, rules : rules.middlename, ref : 'personaldatatab_secondname', }"
            @input_change="setters().setMiddleName( { event : $event } )"
          )
          Input.mix-input.haupt-data__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.thirdname, value : user.lastname, ref : 'personaldatatab_thirdname', }"
            @input_change="setters().setLastName( { event : $event } )"
          )

        .birthday
          dateInputWithTitle.birthday__input(
            :title="inputTitles.birthday"
            :value="user.birthday ? user.birthday.split( ' ' )[ 0 ] : ''"
            @date_change="setters().setBirthday( { event : $event } )"
          )

        .sex
          .titel {{ inputTitles.sex }}
          v-radio-group(
            row
            :value="user.gender"
            @change="setters().setGender( { event : $event } )"
          )
            v-radio( value="male" label="Мужской" color="info" )
            v-radio( value="female" label="Женский" color="info" )
        .city
          Input.mix-input.city__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.city, value : user.settings.city, rules : rules.city, ref : 'personaldatatab_settings_city', }"
            @input_change="setters().setCity( { event : $event } )"
          )

        .contact-info
          Input.mix-input.contact-info__input.phone(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.phone, value : user.settings.contact_phone, rules : rules.phone, ref : 'personaldatatab_settings_contact_phone', }"
            @input_change="setters().setContactPhone( { event : $event } )"
          )
          Input.mix-input.contact-info__input(
            :params="{ ...textInputDefaultSettings, hauptTitel : inputTitles.email, value : user.settings.contact_email, rules : rules.email, ref : 'personaldatatab_settings_contact_email', }"
            @input_change="setters().setContactEmail( { event : $event } )"
          )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import textInputWithTitle from '@/components/UI/textInputWithTitle';
  import dateInputWithTitle from '@/components/UI/dateInputWithTitle';
  import Input from '@/components/UI/input';

  export default {

    components : {
      textInputWithTitle,
      dateInputWithTitle,
      Input,
    },

    data ()
    {
      return {
        hauptTitel : 'Личные данные',

        inputTitles : {
          firstname : 'Имя',
          secondname : 'Фамилия',
          thirdname : 'Отчество',
          birthday : 'Дата рождения',
          sex : 'Пол',
          city : 'Город',
          phone : 'Телефон',
          email : 'Электронная почта',
        },

        textInputDefaultSettings : {
          type : 'text',
          value : '',
          hauptTitel : '',
          solo : true,
          hint : '',
        },

        rules : {
          email : [
            this.$validation.emailFormat,
          ],

          phone : [
            this.$validation.phoneFormat,
          ],

          city : [
            this.$validation.requiredField,
          ],

          firstname : [
            this.$validation.requiredField,
          ],

          middlename : [
            this.$validation.requiredField,
          ],
        },
      }
    },

    computed : {
      ...mapGetters( 'user', [ 'user', 'validation', ] ), // FIXME
    },

    methods : {
      ...mapActions( 'user', [ 'setUserData', 'setUserValidation', ] ),

      getters ()
      {
        return {}
      },

      setters ()
      {
        return {
          setFirstName : ( payload = {} ) => {
            console.log( 'setFirstName', payload ); // DELETE log muss weg

            this.setUserData( { firstname : payload.event.value } );
            this.setUserValidation( { firstname : payload.event.isValid } );
          },

          setMiddleName : ( payload = {} ) => {
            console.log( 'setMiddleName', payload ); // DELETE log muss weg

            this.setUserData( { middlename : payload.event.value } );
            this.setUserValidation( { middlename : payload.event.isValid } );
          },

          setLastName : ( payload = {} ) => {
            console.log( 'setLastName', payload ); // DELETE log muss weg

            this.setUserData( { lastname : payload.event.value } );
            this.setUserValidation( { lastname : payload.event.isValid } );
          },

          setBirthday : ( payload = {} ) => {
            console.log( 'setBirthday', payload ); // DELETE log muss weg

            this.setUserData( { birthday : payload.event } );
          },

          setGender : ( payload = {} ) => {
            console.log( 'setGender', payload ); // DELETE log muss weg

            this.setUserData( { gender : payload.event } );
          },

          setCity : ( payload = {} ) => {
            console.log( 'setCity', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, city : payload.event.value } } );
            this.setUserValidation( { settings_city : payload.event.isValid } );
          },

          setContactPhone : ( payload = {} ) => {
            console.log( 'setContactPhone', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, contact_phone : payload.event.value } } );
            this.setUserValidation( { settings_contact_phone : payload.event.isValid } );
          },

          setContactEmail : ( payload = {} ) => {
            console.log( 'setContactEmail', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, contact_email : payload.event.value } } );
            this.setUserValidation( { settings_contact_email : payload.event.isValid } );
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

    mounted ()
    {
      console.log( 'this.user', this.user );
      console.log( 'this.validation', this.$validation.requiredField );
    },
  }

</script>

<style lang="scss">

.personal-data__tab
{
  /* OBJECTS STYLES START */
    .wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .header {
        margin-bottom: 24px;
      }

      .body
      {
        .wrapper__body
        {
          width: 533px;
        }
      }
    }

    .haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .haupt-data
    {
      .haupt-data__input
      {
        margin-bottom: 24px;
      }
    }

    .birthday {
      margin-bottom: 24px;

      .birthday__input
      {
        width: 180px;

        fieldset
        {
          border-radius: 4px;
        }
      }
    }

    .sex
    {
      .titel
      {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 125%;
        color: #263043;
        margin-bottom: 16px;
      }
    }

    .city
    {
      margin-bottom: 24px;
    }

    .contact-info
    {
      display: grid;
      grid-template-columns: 40% 60%;

      .phone
      {
        margin-right: 24px;
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .mix-input
    {
      .v-input__slot
      {
        margin: 0 !important;
        box-shadow: none !important;

        height: 48px;
        background: #FFFFFF;
        border: 1px solid #E2E4E5;
        box-sizing: border-box;
        border-radius: 4px;
      }
    }
  /* MIXINS STYLES END */
}

</style>
