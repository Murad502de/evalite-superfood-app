<template>
  <div class="create_password">
    <v-container>
      <p class="main_text_executor">Придумайте пароль</p>
      <p>
        Значимость этих проблем настолько очевидна, что начало повседневной
        работы по формированию позиции требуют
      </p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="form-part">
          <p class="input_label">Пароль</p>
          <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min,rules.password]"
            outlined
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            hint="Минимум 8 символов"
            counter
            dense
            @click:append="show1 = !show1"
          ></v-text-field>
        </div>
        <div class="form-part">
          <p class="input_label">Пароль повторно</p>
          <v-text-field
            v-model="confirm_password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[password === confirm_password || 'Пароль не совподает']"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            dense
            outlined
            hint="Минимум 8 символов"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </div>
        <p class="text-grey">
          Требования к паролю: <br />
          длина — не менее 8 символов; <br />
          заглавные буквы; <br />
          строчные буквы; <br />
          цифры или специальные символы: %, #, $ и другие.
        </p>
        <v-btn elevation="0" class="btn-secondary" @click="back(1)">
          <span class="btn-title">Назад</span>
        </v-btn>
        <v-btn
          dark
          elevation="0"
          class="btn-primary"
          :disabled="!disableHandler"
          @click="next(3)"
          ><span class="btn-title">Далее</span>
        </v-btn>
        <div class="d-none">{{requestSuccess}}</div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreatePassword",
  props: {
    email: {},
    phone: {},
    agree: {},
  },
  data() {
    return {
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Заполнития поля",
        min: (v) => v.length >= 8 || "Минимум 8 симболов",
        emailMatch: () => `Пароль не совподает`,
        password : value => {
          const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          return pattern.test(value) || 'Не корректный пароль'
        }
      },
      valid: false,
      confirm_password: null,
      inputRules: [(v) => !!v || "Заполните поля"],
    };
  },
  methods: {
    ...mapActions("executor", ["createPassword"]),
    validate() {
      this.$refs.form.validate();
    },
  async next(value) {
      let data = {
        password: this.password,
        phone: this.phone,
        email: this.email,
      };
      if (this.agree) {
        delete data.phone;
      } else {
        delete data.email;
      }
    await  this.createPassword(data);
      if (this.requestSuccess.type === "success") {
        this.$emit("pageHandler", value);
      } else {
        this.validate();
      }
    },
    back(val) {
      this.$emit("pageHandler", val, "back");
    },
  },
  computed: {
    ...mapGetters("response", ["requestSuccess"]),
    disableHandler() {
      return this.password === this.confirm_password;
    },
  },
};
</script>

<style scoped>
.text-grey {
  color: #9398a1;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  color: lightgrey !important;
  background: #0082de !important;
}
</style>
