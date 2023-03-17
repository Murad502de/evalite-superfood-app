<template lang="pug">
v-card.forgot-pass-card(elevation="3", outlined, width="360")
  v-card-subtitle.forgot-pass-card__title Введите новый пароль
  v-form.forgot-pass-card__form(ref="form", v-model="valid", lazy-validation)
    v-text-field(
      v-model="password",
      :type="showPass ? 'text' : 'password'",
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'",
      @click:append="showPass = !showPass",
      :rules="passwordRules",
      :disabled="loading",
      label="Введите новый пароль",
      required,
      outlined
    )

    v-text-field(
      v-model="password1",
      :type="showPass1 ? 'text' : 'password'",
      :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'",
      @click:append="showPass1 = !showPass1",
      :rules="passwordRules",
      :disabled="loading",
      label="Введите новый пароль повторно",
      required,
      outlined
    )

    .forgot-pass-card__info
      span Требования к паролю:
      br
      span длина — не менее 8 символов;
      br
      span заглавные буквы;
      br
      span строчные буквы;
      br
      span цифры или специальные символы: %, #, $ и другие.

    v-btn.forgot-pass-card__btn(
      :disabled="isBtnDisabled",
      :loading="loading",
      color="#0082DE"
      @click="updatePassword"
    ) обновить пароль
</template>

<script src="./passCard.js" />
<style lang="scss" src="./passCard.scss" />
