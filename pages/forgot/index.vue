<template lang="pug">
.forgot
  v-alert.forgot_failed(
    :value="forgotFailed",
    type="error",
    dismissible,
    transition="scale-transition"
  ) Аккаунт с данным E-mail не найден

  v-card-title.forgot__logo evalite

  v-card.forgot__card(elevation="3", outlined, width="360")
    v-card-subtitle.forgot__card-title Восстановление пароля
    v-form.forgot__card-form(ref="form", v-model="valid", lazy-validation)
      v-text-field(
        v-model="email",
        :rules="emailRules",
        :disabled="loading",
        label="E-mail",
        required,
        outlined
      )

      v-btn.forgot--btn(
        :disabled="!valid && !loading",
        :loading="loading",
        color="#0082DE",
        @click="forgot"
      ) отправить код
</template>

<script src="./forgot.js" />
<style lang="scss" src="./forgot.scss" />
