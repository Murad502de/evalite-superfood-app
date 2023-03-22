<template lang="pug">
.signup-step1-confirm
  .signup-step1-confirm__title Введите код из E-mail
  .signup-step1-confirm__info Письмо с кодом отправлено на {{ email }}
  v-otp-input.signup-step1-confirm__code-input(
    type="number",
    :length="codeLength",
    v-model="code",
    :disabled="disabled"
  )
</template>

<script src="./Step1Confirm.js" />
<style lang="scss" src="./Step1Confirm.scss" />
