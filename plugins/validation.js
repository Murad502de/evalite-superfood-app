export default ({ app, store }, inject) => {
  inject(
    'validation',
    {
      requiredField: v => v?.length || 'Данное поле является обязательным к заполненнию',

      phoneFormat: (value) => {
        const pattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

        console.log('store: ', store);

        return pattern.test(value) || 'Телефон введён некорректно';
      },

      emailFormat: (email) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Zа-яё\-0-9]+\.)+[a-zA-Zа-яё]{2,}))$/;

        return !!regexp.test(email) || 'Email введён некорректно';
      },

      cardNumberFormat: (v) => {
        const regexp = /([!@#$%^&*])/;
        const _regexp = /([a-zA-Z])/;

        if (!v) {
          return 'Номер карты должен содержвать 16 цифр';
        }

        if (v.replaceAll(' ', '')?.length !== 16) {
          return 'Номер карты должен содержвать 16 цифр';
        }

        if (regexp.test(v.replaceAll(' ', ''))) {
          return 'Номер карты не должен содержать специальные символы';
        }

        if (_regexp.test(v.replaceAll(' ', ''))) {
          return 'Номер карты не должен содержать буквы';
        }

        return true;
      },

      innFormat: (inn) => {
        console.log(inn);

        let result = false;

        if (typeof inn === 'number') {
          inn = inn.toString();
        }
        else if (typeof inn !== 'string') {
          inn = '';
        }

        if (!inn.length) {
          return 'ИНН пуст';
        }
        else if (/[^0-9]/.test(inn)) {
          return 'ИНН может состоять только из цифр';
        }
        else if ([10, 12].indexOf(inn.length) === -1) {
          return 'ИНН может состоять только из 10 или 12 цифр';
        }
        else {
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
            return 'Неправильное контрольное число';
          }
        }

        return result;
      },

      kppFormat: (kpp) => {
        let result = false;

        if (typeof kpp === 'number') {
          kpp = kpp.toString();
        }
        else if (typeof kpp !== 'string') {
          kpp = '';
        }

        if (!kpp.length) {
          return 'КПП пуст';
        }
        else if (kpp.length !== 9) {
          return 'КПП может состоять только из 9 знаков (цифр или заглавных букв латинского алфавита от A до Z)';
        }
        else if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
          return 'Неправильный формат КПП';
        }
        else {
          result = true;
        }

        return result;
      },

      bicFormat: (bik) => {
        let result = false;

        if (typeof bik === 'number') {
          bik = bik.toString();
        }
        else if (typeof bik !== 'string') {
          bik = '';
        }

        if (!bik.length) {
          return 'БИК пуст';
        }
        else if (/[^0-9]/.test(bik)) {
          return 'БИК может состоять только из цифр';
        }
        else if (bik.length !== 9) {
          return 'БИК может состоять только из 9 цифр';
        }
        else {
          result = true;
        }

        return result;
      },

      correspondentAccountFormat: (ks) => {
        let result = false;

        console.log('correspondentAccountFormat: ', app);

        if (app.$validation.bicFormat(store.getters['user/user'].settings.bik)) {
          if (typeof ks === 'number') {
            ks = ks.toString();
          }
          else if (typeof ks !== 'string') {
            ks = '';
          }

          if (!ks.length) {
            return 'К/С пуст';
          }
          else if (/[^0-9]/.test(ks)) {
            return 'К/С может состоять только из цифр';
          }
          else if (ks.length !== 20) {
            return 'К/С может состоять только из 20 цифр';
          }
          else {
            let bikKs = '0' + store.getters['user/user'].settings.bik.toString().slice(4, 6) + ks;
            let checksum = 0;
            let coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];

            for (let i in coefficients) {
              checksum += coefficients[i] * (bikKs[i] % 10);
            }

            if (checksum % 10 === 0) {
              result = true;
            }
            else {
              return 'Неправильное контрольное число';
            }
          }
        }

        return result;
      },

      paymentAccountFormat: (rs) => {
        let result = false;

        if (app.$validation.bicFormat(store.getters['user/user'].settings.bik)) {
          if (typeof rs === 'number') {
            rs = rs.toString();
          }
          else if (typeof rs !== 'string') {
            rs = '';
          }

          if (!rs.length) {
            return 'Р/С пуст';
          }
          else if (/[^0-9]/.test(rs)) {
            return 'Р/С может состоять только из цифр';
          }
          else if (rs.length !== 20) {
            return 'Р/С может состоять только из 20 цифр';
          }
          else {
            let bikRs = store.getters['user/user'].settings.bik.toString().slice(-3) + rs;
            let checksum = 0;
            let coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];

            for (let i in coefficients) {
              checksum += coefficients[i] * (bikRs[i] % 10);
            }

            if (checksum % 10 === 0) {
              result = true;
            }
            else {
              return 'Неправильное контрольное число';
            }
          }
        }

        return result;
      },
    }
  );
}
