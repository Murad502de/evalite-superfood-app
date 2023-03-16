<template lang="pug">
.signin
  v-alert.signin_failed(
    :value="signinFailed",
    type="error",
    dismissible,
    transition="scale-transition"
  ) Ошибка аутентификации

  v-card-title.signin__logo evalite
  v-card.signin__card(elevation="3", outlined, width="360")
    v-card-subtitle.signin__card-title Войти в систему
    v-form.signin__card-form(ref="form", v-model="valid", lazy-validation)
      v-text-field(
        v-model="email",
        :rules="emailRules",
        :disabled="loading",
        label="E-mail",
        required,
        outlined
      )

      v-text-field(
        v-model="password",
        :rules="passwordRules",
        :disabled="loading",
        label="Пароль",
        required,
        outlined,
        type="password"
      )

      v-btn.signin--btn(
        :disabled="!valid && !loading",
        :loading="loading",
        color="#0082DE",
        @click="signin"
      ) войти в систему

  .signin__actions
    v-card-subtitle.signin__actions-item.signin__actions-item--forgot(
      @click="redirectTo('forgot')"
    ) Забыли пароль? &nbsp;
      span.signin__actions-item--restore Восстановить

    v-card-subtitle.signin__actions-item.signin__actions-item--signup(
      @click="redirectTo('signup')"
    ) Регистрация
</template>

<script src="./signin.js" />
<style lang="scss" src="./signin.scss" />
