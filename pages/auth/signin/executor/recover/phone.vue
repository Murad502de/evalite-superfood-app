<template lang="pug">
  .login-page
    .wrapper
      .wrapper-x
        .wraper-y
          .login-container
            .wrapper
              .login-logo
                img.auth-logo( src="@/assets/img/auth-logo.png" )
              v-form.auth-form(ref="form" v-model="valid" lazy-validation)
                .wrapper
                  .haupt-titel
                    .txt Восстановление пароля
                  .inputs-group
                    p.text-grey Введите ваш номер телефона, который вы указывали при регистрации в системе
                    .input-line.email-num
                      .titel
                        .txt Номер телефона
                      .input
                        v-text-field(
                          v-model="phone"
                          class="mt-2"
                          type="tel"
                          :rules="phoneRules"
                          outlined
                          name="phone"
                          placeholder="+7")
                  .actions
                    .action
                      v-btn.btn_singup( @click="submit" elevation="0" :disabled="!disableHandler" ) отправить код

</template>

<script>
import {mapActions} from "vuex";

export default {
  layout: "empty",
  components: {},

  data() {
    return {
      phone:'',
      error: false,
      valid:false,
      phoneRules: [
        (v) => !!v || "Заполните поля",
        (v) => (!!v && v.length == 12) || "Номер не корректный",
        (value) => {
          const pattern =
              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          return pattern.test(value) || "Не корректный номер";
        }],
    }

  },

  methods: {
    ...mapActions('executor',['recoverExecutorPhone']),
   async submit() {
      await this.recoverExecutorPhone(this.phone);
        this.$router.push({name:'auth-signin-executor-recover-sms'});
    },
  },
  computed:{
    disableHandler(){
      return this.phone && this.valid
    }
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
  margin-bottom: 40px;

  .auth-logo {
    width: 216px;
    height: 73px;
  }
}

.haupt-titel {
  text-align: center;
  margin-bottom: 24px;

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

.input-line {
  margin-bottom: 16px;

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
</style>
