<template lang="pug">
v-card.forgot-confirm-card(elevation="3", outlined, width="360")
  v-card-subtitle.forgot-confirm-card__title Введите код из E-mail
  v-form.forgot-confirm-card__form(
    ref="form",
    v-model="valid",
    lazy-validation
  )
    v-otp-input(length="4", type="number")

    v-btn.forgot-confirm-card__btn(
      :disabled="!valid && !loading",
      :loading="loading",
      color="#0082DE",
    ) отправить код

    v-btn.forgot-confirm-card__btn(
      outlined
      :disabled="!valid && !loading",
      :loading="loading",
    ) Отправить повторно через 30 сек
</template>

<script src="./confirmCard.js" />
<style lang="scss" src="./confirmCard.scss" />
