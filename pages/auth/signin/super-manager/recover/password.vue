<template lang="pug">
.login-page
  .wrapper
    .wrapper-x
      .wraper-y
        .login-container
          .wrapper
            .login-logo
              img.auth-logo( src="@/assets/img/auth-logo.png" )
            v-form(v-model="valid", lazy-validation ref="form" )
              .auth-form
                .wrapper
                  .haupt-titel
                    .txt Придумайте новый пароль
                  .inputs-group
                    .input-line.email-num.mt-5
                      .titel
                        .txt Введите новый пароль
                      .input
                        v-text-field(
                          v-model="password"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min, rules.password]"
                          outlined
                          :type="show ? 'text' : 'password'"
                          name="input-10-1"
                          hint="Минимум 8 символов"
                          counter
                          @click:append="show = !show"  )
                    .input-line.password-num
                      .titel
                        .txt Введите новый пароль повторно
                      .input
                        v-text-field(
                          v-model="confirm_password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[password === confirm_password || 'Пароль не совподает']"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          outlined
                          hint="Минимум 8 символов"
                          counter
                          @click:append="show1 = !show1"
                        )
                p.requirements Требования к паролю: <br /> длина — не менее 8 символов; <br /> заглавные буквы; <br />  строчные буквы; <br /> цифры или специальные символы: %, #, $ <br /> и другие.
                .actions
                  .action
                     v-btn.btn_singup(elevation="0" @click="submit"  :disabled="!disableHandler") обновить пароль

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  layout: "empty",
  components: {},

  data() {
    return {
      password:'',
      confirm_password:'',
      valid:false,
      error: false,
      show1:false,
      show:false,
      rules: {
        required: (value) => !!value || "Заполнития поля",
        min: (v) => v.length >= 8 || "Минимум 8 симболов",
        password : value => {
          const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          return pattern.test(value) || 'Не корректный пароль'
        }
      },
    };
  },

  methods: {
    ...mapActions('executor',['createPassword']),
   async submit() {
      let obj ={
        phone: this.recover_sms_phone,
        password: this.password
      }
      await  this.createPassword(obj);
     console.log(this.requestSuccess)
      if (this.requestSuccess.type === "success") {
        this.$router.push('/')
      } else {
        this.validate();
      }
    },
  },
  computed:{
    ...mapGetters("response", ["requestSuccess"]),
    ...mapGetters("executor", ["recover_sms_phone"]),
    disableHandler() {
      return this.password && this.password  === this.confirm_password;
    },
  }
};
</script>

<style lang="scss" scoped>
/* OBJECTS STYLES START */

.login-page {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #006edf;

  .wrapper,
  .wrapper-x,
  .wraper-y {
    width: 100%;
    height: 100%;
  }

  .wrapper-x {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .wraper-y {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
}

.login-container {
  .wrapper {
  }
}

.login-logo {
  text-align: center;
  .auth-logo {
    width: 216px;
    height: 73px;
  }
}

.haupt-titel {
  text-align: center;
  margin-bottom: 10px;

  .txt {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 125%;
    color: #263043;
  }
}

.auth-form {
  width: 450px;
  background: #ffffff;
  box-shadow: 0px 8px 36px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
  margin-bottom: 40px;
  padding: 24px 24px 40px 24px;
}

.password-forgot {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  line-height: 125%;
  color: #ffffff;
  text-align: center;
}

.input-line  {

  .titel {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    margin-bottom: 16px;
  }
  .input {
    .item {
      width: 100%;
      height: 50px;
      border: 1px solid rgba(86, 103, 137, 0.26);
      box-sizing: border-box;
      border-radius: 8px;
      padding-left: 16px;
    }
  }
}

.signin-btn {
  background: #0082de;
  border-radius: 8px;
  height: 50px;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  .titel {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #ffffff;
  }
}

/* OBJECTS STYLES END */

/* MIXINS STYLES START */
.error-by-signin {
  border-color: red !important;
}
.text-grey{
  color: #7A91A9;
  font-size: 16px;
  text-align: center;
}
.btn-text{
  text-transform: uppercase;
}
.requirements{
  color: #7A91A9;
}
.v-btn__content{
  width: 100%;
}
.btn_singup{
  width: 100%;
  background: #0082de!important;
  color: white;
  border-radius: 8px;
  height: 50px!important;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  color: lightgrey !important;
  background: #0082de !important;
}
/* MIXINS STYLES END */
</style>
