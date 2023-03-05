<template lang="pug">
  .login-page.sms
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
                    .txt Восстановление пароля

                    p.text-grey Мы отправили SMS с кодом <br /> на номер {{recover_sms_phone}}
                    .input-line.email-num
                      .titel
                        v-otp-input.item.mt-4(  length='4' v-model='sms'   :rules="inputRules" )
                  .actions
                    .action
                      .signin-btn( @click="submit" )
                        .titel.btn-text ПРОДОЛЖИТЬ
                      .send-again
                        .titel.btn-again(v-if="countDown > 0" ) Отправить повторно через {{countDown}} сек
                        .titel.btn-again(v-else @click="sendAgain" ) Отправить код повторно

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  layout: "empty",
  components: {},

  data() {
    return {
      sms: "",
      error: false,
      countDown: "60",
      inputRules: [(v) => !!v || "Заполните поля", !this.valid || 'поля не правильное'],
    };
  },

  methods: {
    ...mapActions('executor',['sigInInConfirmPassword']),
   async submit() {
    await  this.sigInInConfirmPassword(this.sms)
      if (this.requestSuccess.type === "success") {
        this.$router.push({name:'auth-signin-executor-recover-password'});
      } else {
        this.$refs.form.validate()
        this.sms = ''
      }
    },
    sendAgain() {
      this.countDown = 60;
      this.countDownTimer();
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    smsHandler() {
      this.countDown = 60;
      this.countDownTimer();
    },
  },
  computed:{
    ...mapGetters('executor',['recover_sms_phone']),
    ...mapGetters("response", ["requestSuccess"]),
  },
  created() {
    this.countDownTimer();
  },
};
</script>

<style lang="scss">
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
      height: 50px;
      margin-top: 10px;
      border: 1px solid lightgrey !important;
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
.send-again {
  background: white;
  border-radius: 8px;
  height: 50px;
  border: 1px solid #7a91a9;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}
/* OBJECTS STYLES END */

/* MIXINS STYLES START */
.error-by-signin {
  border-color: red !important;
}
.text-grey {
  color: #7a91a9;
  font-size: 16px;
  text-align: center;
}
.btn-text {
  text-transform: uppercase;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}
.btn-again {
  color: #7a91a9;
  text-transform: uppercase;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}
.sms .theme--light.v-input input,
.theme--light.v-input textarea {
  color: #0082de !important;
  font-size: 45px;
}
.btn_singup {
  width: 100%;
  background: #0082de !important;
  color: white;
  border-radius: 8px;
  height: 50px !important;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
/* MIXINS STYLES END */
</style>