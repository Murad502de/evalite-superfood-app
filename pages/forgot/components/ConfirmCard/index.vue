<template lang="pug">
v-card.forgot-confirm-card(elevation="3", outlined, width="360")
  v-card-title.forgot-confirm-card__title Введите код из E-mail
  v-form.forgot-confirm-card__form(
    ref="form",
    v-model="valid",
    lazy-validation
  )
    v-card-subtitle.forgot-confirm-card__info Письмо с кодом отправлено на test@gmail.com

    v-otp-input.forgot-confirm-card__code-input(length="4", type="number")

    v-btn.forgot-confirm-card__btn.forgot-confirm-card__btn--confirm(
      :disabled="!valid && !loading",
      :loading="loading",
      color="#0082DE",
    ) отправить код

    v-btn.forgot-confirm-card__btn.forgot-confirm-card__btn--send-code(
      outlined
      :disabled="!loading",
      :loading="loading",
    ) отправить повторно через 30 сек
</template>

<script src="./confirmCard.js" />
<style lang="scss" src="./confirmCard.scss" />
