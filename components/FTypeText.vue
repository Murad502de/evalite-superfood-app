<template>
  <div class="d-flex align-center text-group">
    <span class="time-title" v-if="params && params.prepend">{{params.prepend}}</span>
    <v-text-field
        :name="name"
        single-line
        outlined
        filled
        :prepend-inner-icon="icon_code"
        v-model="new_value"
        @input="$emit('input', new_value)"
        hide-details="auto"
        :rules="validation_array"
        :class="{'number': validation && validation[0] == 'number'}"
        :readonly="readonly"
        :placeholder="placeholder"
        :clearable="clearable"
    ></v-text-field>
    <div class="note" v-if="params && params.note">{{params.note}}</div>
  </div>
</template>

<script>
export default {
  props: ['name', 'icon', 'validation', 'params', 'value'],
  data() {
    return {
      new_value: '',
      rules: {
        required: value => !!value || 'Заполните поле',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Zа-яё\-0-9]+\.)+[a-zA-Zа-яё]{2,}))$/;
          if (value) {
            return pattern.test(value) || 'Введите корректный email'
          }
          else{
            return true;
          }
        },
        phone: value => {
          const pattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
          if (value){
            return pattern.test(value) || 'Введите корректный телефон'
          }
          else{
            return true;
          }
        },
        number: value => {
          const pattern = /^\d+(?:[\.,]\d+)?$/; // /(?<=^| )\d+(\.\d+)?(?=$| )/;
          return pattern.test(value) || 'Введите число'
        },
        ogrn: value => {
          if (value) {
            return this.validateOgrn(value) || this.error.message
          }
          else{
            return true;
          }
        },
        ogrnip: value => {
          if (value) {
            return this.validateOgrnip(value) || this.error.message
          }
          else{
            return true;
          }

        },
        inn: value => {
          if (value) {
            return this.validateInn(value) || this.error.message
          }
          else{
            return true;
          }


        },
        kpp: value => {
          if (value) {
            return this.validateKpp(value) || this.error.message
          }
          else{
            return true;
          }


        },
        bik: value => {
          if (value) {
            return this.validateBik(value) || this.error.message
          }
          else{
            return true;
          }

        },
        ks: value => {
          if (value) {
            return this.validateKs(value, this.params.bik) || this.error.message
          }
          else{
            return true;
          }

        },
        rs: value => {
          if (value) {
            return this.validateRs(value, this.params.bik) || this.error.message
          }
          else{
            return true;
          }

        },
      },
      error: {
        message: null
      }
    }
  },
  computed: {
    icon_code() {
      if (this.icon) {
        return this.icon;
      } else {
        return null;
      }
    },
    validation_array() {
      let validation_array = [];
      if (this.validation) {
        for (let i = 0; i < this.validation.length; i++) {
          validation_array.push(this.rules[this.validation[i]]);
        }
      }
      return validation_array;
    },
    readonly(){
      if (this.params && this.params.readonly) {
        return true;
      } else {
        return false;
      }
    },
    placeholder(){
      if (this.params && this.params.placeholder) {
        return this.params.placeholder;
      } else {
        return '';
      }
    },
    clearable(){
      if (this.params && this.params.clearable) {
        return true
      } else {
        return false;
      }
    },
  },
  methods: {
    validateOgrn(ogrn) {
      let result = false;
      if (typeof ogrn === 'number') {
        ogrn = ogrn.toString();
      } else if (typeof ogrn !== 'string') {
        ogrn = '';
      }
      if (!ogrn.length) {
        this.error.message = 'ОГРН пуст';
      } else if (/[^0-9]/.test(ogrn)) {
        this.error.message = 'ОГРН может состоять только из цифр';
      } else if (ogrn.length !== 13) {
        this.error.message = 'ОГРН может состоять только из 13 цифр';
      } else {
        let n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
        if (n13 === parseInt(ogrn[12])) {
          result = true;
        } else {
          this.error.message = 'Неправильное контрольное число';
        }
      }
      return result;
    },
    validateOgrnip(ogrnip) {
      let result = false;
      if (typeof ogrnip === 'number') {
        ogrnip = ogrnip.toString();
      } else if (typeof ogrnip !== 'string') {
        ogrnip = '';
      }
      if (!ogrnip.length) {
        this.error.message = 'ОГРНИП пуст';
      } else if (/[^0-9]/.test(ogrnip)) {
        this.error.message = 'ОГРНИП может состоять только из цифр';
      } else if (ogrnip.length !== 15) {
        this.error.message = 'ОГРНИП может состоять только из 15 цифр';
      } else {
        let n15 = parseInt((parseInt(ogrnip.slice(0, -1)) % 13).toString().slice(-1));
        if (n15 === parseInt(ogrnip[14])) {
          result = true;
        } else {
          this.error.message = 'Неправильное контрольное число';
        }
      }
      return result;
    },
    validateInn ( inn ) {
      let result = false;
      if (typeof inn === 'number') {
        inn = inn.toString();
      } else if (typeof inn !== 'string') {
        inn = '';
      }
      if (!inn.length) {
        this.error.message = 'ИНН пуст';
      } else if (/[^0-9]/.test(inn)) {
        this.error.message = 'ИНН может состоять только из цифр';
      } else if ([10, 12].indexOf(inn.length) === -1) {
        this.error.message = 'ИНН может состоять только из 10 или 12 цифр';
      } else {
        let checkDigit = function (inn, coefficients) {
          let n = 0;
          for (let i in coefficients) {
            n += coefficients[i] * inn[i];
          }
          return parseInt(n % 11 % 10);
        };
        switch (inn.length) {
          case 10:
            let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
            if (n10 === parseInt(inn[9])) {
              result = true;
            }
            break;
          case 12:
            let n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            let n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
              result = true;
            }
            break;
        }
        if (!result) {
          this.error.message = 'Неправильное контрольное число';
        }
      }
      return result;
    },
    validateKpp(kpp) {
      let result = false;
      if (typeof kpp === 'number') {
        kpp = kpp.toString();
      } else if (typeof kpp !== 'string') {
        kpp = '';
      }
      if (!kpp.length) {
        this.error.message = 'КПП пуст';
      } else if (kpp.length !== 9) {
        this.error.message = 'КПП может состоять только из 9 знаков (цифр или заглавных букв латинского алфавита от A до Z)';
      } else if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
        this.error.message = 'Неправильный формат КПП';
      } else {
        result = true;
      }
      return result;
    },
    validateBik(bik) {
      let result = false;
      if (typeof bik === 'number') {
        bik = bik.toString();
      } else if (typeof bik !== 'string') {
        bik = '';
      }
      if (!bik.length) {
        this.error.message = 'БИК пуст';
      } else if (/[^0-9]/.test(bik)) {
        this.error.message = 'БИК может состоять только из цифр';
      } else if (bik.length !== 9) {
        this.error.message = 'БИК может состоять только из 9 цифр';
      } else {
        result = true;
      }
      return result;
    },
    validateKs(ks, bik) {
      let result = false;
      if (this.validateBik(bik)) {
        if (typeof ks === 'number') {
          ks = ks.toString();
        } else if (typeof ks !== 'string') {
          ks = '';
        }
        if (!ks.length) {
          this.error.message = 'К/С пуст';
        } else if (/[^0-9]/.test(ks)) {
          this.error.message = 'К/С может состоять только из цифр';
        } else if (ks.length !== 20) {
          this.error.message = 'К/С может состоять только из 20 цифр';
        } else {
          let bikKs = '0' + bik.toString().slice(4, 6) + ks;
          let checksum = 0;
          let coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
          for (let i in coefficients) {
            checksum += coefficients[i] * (bikKs[i] % 10);
          }
          if (checksum % 10 === 0) {
            result = true;
          } else {
            this.error.message = 'Неправильное контрольное число';
          }
        }
      }
      return result;
    },
    validateRs(rs, bik) {
      let result = false;
      if (this.validateBik(bik)) {
        if (typeof rs === 'number') {
          rs = rs.toString();
        } else if (typeof rs !== 'string') {
          rs = '';
        }
        if (!rs.length) {
          this.error.message = 'Р/С пуст';
        } else if (/[^0-9]/.test(rs)) {
          this.error.message = 'Р/С может состоять только из цифр';
        } else if (rs.length !== 20) {
          this.error.message = 'Р/С может состоять только из 20 цифр';
        } else {
          let bikRs = bik.toString().slice(-3) + rs;
          let checksum = 0;
          let coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
          for (let i in coefficients) {
            checksum += coefficients[i] * (bikRs[i] % 10);
          }
          if (checksum % 10 === 0) {
            result = true;
          } else {
            this.error.message = 'Неправильное контрольное число';
          }
        }
      }
      return result;
    }
  },
  created() {
    this.new_value = this.value;
  },
  watch: {
    value: function () {
      this.new_value = this.value;
    },
    params: {
      handler(val){
        if (this.name == 'cor_account' || this.name == 'payment_account'){
          this.new_value = '';
        }
      },
      deep: true
    }
  },
}
</script>

<style lang="scss">

@import '/assets/scss/colors.scss';

.ruqi {

  .text-group{
    align-items: center;

    .time-title{
      margin: 0 10px;

      &:first-child{
        margin-left: 0
      }
    }
  }

  .v-text-field--full-width .v-input__prepend-outer,
  .v-text-field--full-width .v-input__prepend-inner,
  .v-text-field--enclosed .v-input__prepend-outer,
  .v-text-field--enclosed .v-input__prepend-inner {
    margin-top: 10px;
  }

  .v-input.number {
    max-width: 78px;

    .v-text-field__details {
      position: absolute;
      bottom: -22px;
      width: 100px;
      padding: 0;
    }
  }

  .note{
    font-size: 14px;
    margin-top: 12px;
    color: $grey;
  }
}

</style>
