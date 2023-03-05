<template>
  <div class="sms">
    <v-container>
      <div v-if="agree === false">
        <p class="main_text_executor">Введите код из sms</p>
        <p>
          Мы выслали SMS с кодом на номер <strong>{{ phone }}</strong>
        </p>
      </div>
      <div v-else>
        <h2>Введите код из email</h2>
        <p>
          Мы выслали SMS с кодом на почту <strong>{{ email }}</strong>
        </p>
      </div>
      <div class="code mt-10">
        <v-form style="width: 300px" v-model="valid" lazy-validation ref="form">

          <v-otp-input
              length="4"
              v-model="smsCode"
              :rules="inputRules"
          ></v-otp-input>
        </v-form>

      </div>
      <p class="mt-10 text-grey" v-if="countDown > 1">
        Выслать код заново можно будет через {{ countDown }} секунд.
      </p>
      <v-btn elevation="0" class="mt-10" @click="smsHandler" v-else
        >Выслать код заново</v-btn
      >
      <div class="mt-10">
        <v-btn elevation="0" class="btn-secondary" @click="back(0)">
          <span class="btn-title">Назад</span>
        </v-btn>
        <v-btn dark elevation="0" class="btn-primary" @click="next(2)"
          ><span class="btn-title">Далее</span>
        </v-btn>
      </div>
    </v-container>
    <div class="d-none">{{ requestSuccess }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Sms",
  props: {
    phone: {
      required: true,
    },
    email: {
      required: true,
    },
    agree: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      smsCode: "",
      code: new Array(5),
      codeId: ["first", "second", "third", "forth", "fifth"],
      interval: 0,
      timerEnabled: true,
      countDown: 60,
      valid: false,
      inputRules: [(v) => !!v || "Заполните поля", !this.valid || 'поля не правильное'],
    };
  },
  methods: {
    ...mapActions("executor", ["confirmPassword"]),
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    smsHandler() {
      this.countDown = 10;
      this.countDownTimer();
    },
    async next(value) {
      if (this.agree) {
        let obj = {
          code_confirm: this.smsCode,
          email: this.email,
        };
        await this.confirmPassword(obj);
      } else {
        let obj = {
          code_confirm: this.smsCode,
          phone: this.phone,
        };
        await this.confirmPassword(obj);
      }
      if (this.requestSuccess.type === "success") {
        console.log(this.requestSuccess)
        this.$emit("pageHandler", value);
      } else {
        this.$refs.form.validate()
      }
    },
    back(val) {
      this.$emit("pageHandler", val, "back");
    },
  },
  computed: {
    ...mapGetters("response", ["requestSuccess"]),
  },
  watch: {
    code: function (newValue, oldValue) {
      let tempValue = "";
      for (let i = 0; i < newValue.length; i++) {
        if (i == 5) {
          console.log(i);
          break;
        }
        if (newValue[i]) {
          tempValue = tempValue + newValue[i];
        }
      }
      this.smsCode = tempValue;
      let m = tempValue.split("");
      let location = 0;
      for (let i = 0; i < newValue.length; i++) {
        if (m[i] && i < 5) {
          location++;
          newValue[i] = m[i];
        } else {
          newValue[i] = "";
        }
      }
      if (location < 1) {
        location = 1;
      } else if (location > 5) {
        location = 5;
      }
      document.getElementById(this.codeId[location - 1]).focus();
    },

    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      }
    },

    timerCount: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        } else {
          this.timerEnabled = false;
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  created() {
    this.countDownTimer();
  },
};
</script>

<style scoped>
.inputStyle {
  width: 50px;
  height: 50px;
  text-align: center;
  border: 1px solid lightgrey;
  margin-right: 5px;
  margin-left: 5px;
}
.text-grey {
  color: #8692a6;
}
</style>
