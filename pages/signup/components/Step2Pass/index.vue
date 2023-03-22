<template lang="pug">
.signup-step1-pass
  .signup-step1-pass__title Введите пароль
  v-form.signup-step1-pass__form(ref="form", v-model="valid", lazy-validation)
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

    .signup-step1-pass__info
      span Требования к паролю:
      br
      span длина — не менее 8 символов;
      br
      span заглавные буквы;
      br
      span строчные буквы;
      br
      span цифры или специальные символы: %, #, $ и другие.
</template>

<script src="./Step2Pass.js" />
<style lang="scss" src="./Step2Pass.scss" />
