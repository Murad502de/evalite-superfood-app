<template lang="pug">
.signup-step1-pass
  .signup-step1-pass__title {{ title }}
  .signup-step1-pass__title-sub {{ subTitle }}

  v-form.signup-step1-pass__form(ref="form", v-model="valid", lazy-validation)
    v-text-field(
      v-model="password",
      :type="showPass ? 'text' : 'password'",
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'",
      @click:append="showPass = !showPass",
      :rules="passwordRules",
      :disabled="loading",
      :label="passInputLabel",
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
      :label="passInputAgainLabel",
      required,
      outlined
    )

    .signup-step1-pass__info
      span {{ passRequirementsTitle }}
      br
      span {{ passLengthTitle }}
      br
      span {{ passCapitalLettersTitle }}
      br
      span {{ passLowerCaseTitle }}
      br
      span {{ passOtherSymbolsTitle }}
</template>

<script src="./Step2Pass.js" />
<style lang="scss" src="./Step2Pass.scss" />
