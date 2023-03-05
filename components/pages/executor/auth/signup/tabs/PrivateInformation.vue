<template>
  <div class="private_info">
    <v-container>
      <div class="content">
        <p class="main_text_executor">Личные данные</p>
        <p class="mt-4 mb-4">
          Значимость этих проблем настолько очевидна, что начало повседневной
          работы по формированию позиции требуют
        </p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="form-part">
            <p class="input_label">Имя</p>
            <v-text-field
              outlined
              class="mt-2"
              v-model="form.name"
              :rules="inputRules"
              dense
              required
              single-line
            ></v-text-field>
          </div>

          <div class="form-part">
            <p class="input_label">Фамилия</p>
            <v-text-field
              outlined
              required
              class="mt-2"
              dense
              :rules="inputRules"
              v-model="form.surname"
            ></v-text-field>
          </div>

          <div class="form-part">
            <p class="input_label">Отчество</p>
            <v-text-field
              outlined
              required
              class="mt-2"
              v-model="form.middle_name"
              dense
            ></v-text-field>
          </div>
          <div class="form-part">
            <p class="input_label">Пол</p>

            <v-select
              outlined
              class="mt-2"
              required
              dense
              placeholder="Не выбрано"
              :rules="inputRules"
              v-model="form.sex"
              :items="sex_options"
            ></v-select>
          </div>
          <div class="form-part">
            <p class="input_label">Дата рождения</p>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="form.date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.birth_date"
                  :rules="inputRules"
                  label="ДД.ММ.ГГГГ"
                  required
                  class="mt-2"
                  readonly
                  v-bind="attrs"
                  outlined
                  dense
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.birth_date"
                :rules="inputRules"
                no-title
                required
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(form.birth_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="form-part" v-if="!agree">
            <p class="input_label">Телефон</p>

            <v-text-field
              v-model="form.phone"
              class="mt-2"
              type="tel"
              :rules="phoneRules"
              outlined
              name="phone"
              placeholder="+7"
              dense
            ></v-text-field>
          </div>

          <div class="form-part" v-if="agree">
            <p class="input_label">Email</p>
            <v-text-field
              class="mt-2"
              v-model="form.email"
              :rules="emailRules"
              outlined
              placeholder=""
              dense
            ></v-text-field>
          </div>

          <div class="form-part-checkbox">
            <div class="d-flex">
              <v-checkbox
                v-model="form.agree"
                @click="checkboxHandler"
              ></v-checkbox>
              <p class="mt-5 input_label">Я не могу получить код по SMS</p>
            </div>
            <p class="text-grey-checkbox">
              Выбрав эту опцию вам будет предложено <br />
              связаться с менеджером для регистрации по телефону
            </p>
            <v-btn
              elevation="0"
              class="btn-secondary"
              @click="$router.push('/auth/signup/executor/')"
            >
              <span class="btn-title">Назад</span>
            </v-btn>
            <v-btn
              dark
              elevation="0"
              class="btn-primary"
              :disabled="!disableHandler"
              @click="next(1)"
              ><span class="btn-title">Далее</span>
            </v-btn>
            <p class="text-grey text-center mt-3">
              Значимость этих проблем настолько очевидна, что начало
              повседневной работы по формированию позиции требуют
            </p>
          </div>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PrivateInformation",
  props: {
    form: {
      type: Object,
      required: true,
      default: {},
    },
    agree: {
      type: Boolean,
    },
  },
  data() {
    return {
      valid: false,
      phoneNumber: "",
      menu: "",
      sex_options: ["мужской", "женский"],
      switcher: false,
      inputRules: [(v) => !!v || "Заполните поля"],
      phoneRules: [
        (v) => !!v || "Заполните поля",
        (v) => (!!v && v.length == 12) || "Номер не корректный",
        (value) => {
          const pattern =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
          return pattern.test(value) || "Не корректный номер";
        },
      ],
      emailRules: [
        (v) => !!v || "Заполните поля",
        (v) => /.+@.+/.test(v) || "E-mail должен быть валидным",
      ],
    };
  },
  methods: {
    ...mapActions("executor", ["createExecutor"]),
    validate() {
      this.$refs.form.validate();
    },
    async next(value) {
      if (this.form.agree) {
        delete this.form.phone;
      } else {
        delete this.form.email;
      }
      await this.createExecutor(this.form);
      console.log(this.requestSuccess);
      if (this.requestSuccess.type === "success") {
        this.$emit("pageHandler", value);
      } else {
        this.$refs.form.validate()
      }
    },
    checkboxHandler() {
      this.switcher = !this.switcher;
      this.$emit("checkboxHandler", this.switcher);
    },
  },
  computed: {
    ...mapGetters("response", ["requestSuccess"]),
    executors() {
      return this.$store.getters["executor/executors"];
    },
    disableHandler() {
      if (this.agree) {
        return (
          this.form.name &&
          this.form.surname &&
          this.form.email &&
          this.form.sex &&
          this.form.date &&
          this.valid
        );
      } else {
        return (
          this.form.name &&
          this.form.surname &&
          this.form.phone &&
          this.form.sex &&
          this.form.date &&
          this.valid
        );
      }
    },
  },
};
</script>

<style scoped>
.text-grey-checkbox {
  color: #8692a6 !important;
  margin-top: -10px;
  font-size: 14px;
}
.v-input__control {
  border: 1px solid lightgrey !important;
}
.btn-primary {
  background: #0082de !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
  margin-top: 15px;
}
.btn-secondary {
  background: #f2f6f9 !important;
  border-radius: 8px;
  height: 45px !important;
  width: 100%;
}
.form-part-title {
  margin-top: -10px;
  margin-bottom: 10px;
}
.text-grey {
  color: #8692a6;
  font-size: 14px;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  color: lightgrey !important;
  background: #0082de !important;
}
</style>
