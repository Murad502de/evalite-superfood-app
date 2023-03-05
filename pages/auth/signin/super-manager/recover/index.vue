<template lang="pug">
  .login-page
    .wrapper
      .wrapper-x
        .wraper-y
          .login-container
            .wrapper
              .login-logo
                img.auth-logo( src="@/assets/img/auth-logo.png" )
              v-form.auth-form(v-model="valid" lazy-validation ref="form" )
                .wrapper
                  .haupt-titel
                    .txt Войти в систему
                  .inputs-group
                    .input-line.email-num
                      .titel
                        .txt Email или номер телефона
                      .input
                        v-text-field( outlined type="text" :rules="inputRules" v-model="login.phone_or_email"  )
                    .input-line.password
                      .titel
                        .txt Пароль
                      .input
                        v-text-field( outlined type="password" :rules="passwordRules" v-model="login.password"  )
                      input(:value="requestHandler")
                  .actions
                    .action
                      v-btn.btn_singup( @click="signinHandler" elevation="0" :disabled="!disableHandler" )
                        .titel Войти в систему

              .password-forgot( @click="forgot()" ) Забыли пароль?  Восстановить
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  layout: "empty",
  components: {},

  data() {
    return {
      login: {
        phone_or_email: "",
        password: "",
      },
      requestHandler: '',
      valid: false,
      inputRules: [(v) => !!v || "Заполните поля"],
      passwordRules: [(v) => !!v || "Заполните поля"]
    };
  },
  computed: {
    ...mapGetters("response", ["requestSuccess"]),
    disableHandler() {
      return this.login.phone_or_email && this.login.password;
    },
  },
  methods: {
    ...mapActions("executor", ["signIn"]),

    async signinHandler() {
      await this.signIn(this.login);
      console.log(this.requestSuccess)
      if (this.requestSuccess.type === "success") {
        this.$router.push('/');
      } else {
        this.$refs.form.validate()
        this.login.password = ''
      }
    },
    forgot() {
      this.$router.push({name:'auth-signin-executor-recover-phone'});
    },
  },
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