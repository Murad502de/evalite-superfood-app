<template lang="pug">

.payment-details__tab
  .wrapper
    .header
      .haupt-titel {{ hauptTitel }}
      .description {{ description }}
    .body
      .wrapper__body
        .payment-type
          selectSingle.payment-type__list(
            :id="'payment-type'"
            :items="paymentTypeOptions"
            :title="titles.coverTitle"
            :value="user.settings.type_payment"
            @change="setters().onPaymentTypeSelectChange( { $event } )"
          )
        .bankcard-number( v-show="user.settings.type_payment === 'банковская карта'" )
          Input.bankcard-number__input.mix-input(
            :params="{ ...textInputDefaultSettings, hauptTitel : titles.bankcard, value : getters().getCardNumber(), rules : rules.cardNumber, ref : 'paymentdettab_bankcard', }"
            @input="setters().setBankCarcNumber( { event : $event } )"
          )
        .inn-kpp-bic__group
          .inn
            Input.inn__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.inn, value : user.settings.inn, rules : rules.inn, ref : 'paymentdettab_inn', }"
              @input_change="setters().setInn( { event : $event } )"
            )
          .kpp
            Input.kpp__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.kpp, value : user.settings.kpp, rules : rules.kpp, ref : 'paymentdettab_kpp', }"
              @input_change="setters().setKpp( { event : $event } )"
            )
          .bic
            Input.bic__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.bic, value : user.settings.bik, rules : rules.bic, ref : 'paymentdettab_bic', }"
              @input_change="setters().setBic( { event : $event } )"
            )
        .payment_correspondent-account__group
          .payment-account
            Input.payment-account__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.paymentAccount, value : user.settings.payment_account, rules : rules.paymentAccount, ref : 'paymentdettab_payment-account', }"
              @input_change="setters().setPaymentAccount( { event : $event } )"
            )
          .correspondent-account
            Input.correspondent-account__input.mix-input(
              :params="{ ...textInputDefaultSettings, hauptTitel : titles.correspondentAccount, value : user.settings.correspondent_account, rules : rules.correspondentAccount, ref : 'paymentdettab_correspondent-account', }"
              @input_change="setters().setCorrespondentAccount( { event : $event } )"
            )
        .bank
          Input.correspondent-account__input.mix-input(
            :params="{ ...textInputDefaultSettings, hauptTitel : titles.bank, value : user.settings.bank, rules : rules.bank, ref : 'paymentdettab_correspondent-account', }"
            @input_change="setters().setBank( { event : $event } )"
          )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import selectSingle from '@/components/UI/selectSingle';
  import Input from '@/components/UI/input';

  export default {

    components : {
      selectSingle,
      Input,
    },

    data ()
    {
      return {
        hauptTitel : 'Платежные данные',
        description : 'Краткое описание что сюда писать, например напишите в наименовании общедоступное название и примерное расположение.',
        titles : {
          coverTitle : 'Тип оплаты',
          bankcard : 'Номер карты',
          inn : 'ИНН',
          kpp : 'КПП',
          bic : 'БИК',
          paymentAccount : 'Расчетный счет',
          correspondentAccount : 'Корреспондентский счёт',
          bank : 'Банк',
        },

        textInputDefaultSettings : {
          type : 'text',
          value : '',
          hauptTitel : '',
          solo : true,
          hint : '',
        },

        paymentTypeOptions : [
          {
            uuid : 'банковская карта',
            name : 'банковская карта',
          },

          {
            uuid : 'наличные',
            name : 'наличные',
          },
        ],

        rules : {
          cardNumber : [
            this.$validation.cardNumberFormat,
          ],
          inn : [
            this.$validation.innFormat,
          ],

          kpp : [
            this.$validation.kppFormat,
          ],

          bic : [
            this.$validation.bicFormat,
          ],

          paymentAccount : [
            this.$validation.paymentAccountFormat,
          ],

          correspondentAccount : [
            this.$validation.correspondentAccountFormat,
          ],

          bank : [
            this.$validation.requiredField,
          ],
        },

        error : {
          message: null
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
        return {
          getCardNumber : ( payload = {} ) => {
            return this.user.settings.bank_card ? this.user.settings.bank_card.match(/.{1,4}/g).join(' ') : '';
          }
        }
      },

      setters ()
      {
        return {
          onPaymentTypeSelectChange : ( payload = {} ) => {
            console.log( 'onPaymentTypeSelectChange', payload ); // DELETE

            this.setUserData( { settings : { ...this.user.settings, type_payment : payload.$event.ctx } } );
          },

          setBankCarcNumber : ( payload = {} ) => {
            console.log( 'setBankCarcNumber', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, bank_card : payload.event.value.replaceAll( ' ', '' ) } } );
            this.setUserValidation( { settings_bank_card : payload.event.isValid } );
          },

          setInn : ( payload = {} ) => {
            console.log( 'setInn', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, inn : payload.event.value } } );
            this.setUserValidation( { settings_inn : payload.event.isValid } );
          },

          setKpp : ( payload = {} ) => {
            console.log( 'setKpp', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, kpp : payload.event.value } } );
            this.setUserValidation( { settings_kpp : payload.event.isValid } );
          },

          setBic : ( payload = {} ) => {
            console.log( 'setBic', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, bik : payload.event.value } } );
            this.setUserValidation( { settings_bic : payload.event.isValid } );
          },

          setPaymentAccount : ( payload = {} ) => {
            console.log( 'setPaymentAccount', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, payment_account : payload.event.value } } );
            this.setUserValidation( { settings_payment_account : payload.event.isValid } );
          },

          setCorrespondentAccount : ( payload = {} ) => {
            console.log( 'setCorrespondentAccount', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, correspondent_account : payload.event.value } } );
            this.setUserValidation( { settings_correspondent_account : payload.event.isValid } );
          },

          setBank : ( payload = {} ) => {
            console.log( 'setBank', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, bank : payload.event.value } } );
            this.setUserValidation( { settings_bank : payload.event.isValid } );
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

<style lang="scss">

.payment-details__tab
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
        margin-bottom: 32px;
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
      margin-bottom: 16px;
    }

    .description
    {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #7A91A9;
    }

    .payment-type
    {
      margin-bottom: 24px;

      .payment-type__list
      {
        width: 416px;

        fieldset
        {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }

    .bankcard-number
    {
      margin-bottom: 24px;

      .bankcard-number__input
      {
        width: 416px;

        fieldset
        {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }

    .inn-kpp-bic__group
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 24px;

      .inn, .kpp, .bic
      {
        width: 115px;
      }

      .kpp, .bic
      {
        margin-left: 24px;
      }
    }

    .payment_correspondent-account__group
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 24px;

      .payment-account, .correspondent-account
      {
        width: 197px;
      }

      .correspondent-account
      {
        margin-left: 24px;
      }
    }

    .bank
    {
      .bank__list
      {
        fieldset
        {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .v-select__selection.v-select__selection--comma, .v-icon.notranslate.mdi
    {
      color : #000000!important;
    }

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
