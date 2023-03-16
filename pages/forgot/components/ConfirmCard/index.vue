<template lang="pug">
v-card.forgot-confirm-card(elevation="3", outlined, width="360")
  v-card-title.forgot-confirm-card__title Введите код из E-mail
  v-form.forgot-confirm-card__form(
    ref="form",
    v-model="valid",
    lazy-validation
  )
    v-card-subtitle.forgot-confirm-card__info Письмо с кодом отправлено на {{ email }}

    v-otp-input.forgot-confirm-card__code-input(
      type="number",
      :length="codeLength",
      v-model="code",
      :disabled="sendCodeLoading || confirmCodeLoading"
    )

    v-btn.forgot-confirm-card__btn.forgot-confirm-card__btn--confirm(
      :disabled="!isConfirmCodeActive || sendCodeLoading",
      :loading="confirmCodeLoading",
      color="#0082DE"
      @click="sendCodeToConfirm"
    ) отправить код

    v-btn.forgot-confirm-card__btn.forgot-confirm-card__btn--send-code(
      outlined,
      :disabled="!isSendCodeActive || confirmCodeLoading",
      :loading="sendCodeLoading"
      @click="sendCodeToEmail"
    ) {{ sendCodeTitle }}
</template>

<script src="./confirmCard.js" />
<style lang="scss" src="./confirmCard.scss" />
