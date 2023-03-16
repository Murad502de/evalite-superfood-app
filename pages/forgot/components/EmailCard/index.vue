<template lang="pug">
v-card.forgot-email-card(elevation="3", outlined, width="360")
  v-card-subtitle.forgot-email-card__title Восстановление пароля
  v-form.forgot-email-card__form(ref="form", v-model="valid", lazy-validation)
    v-text-field(
      v-model="email",
      :rules="emailRules",
      :disabled="loading",
      label="E-mail",
      required,
      outlined
    )

    v-btn.forgot-email-card__btn(
      :disabled="!valid && !loading",
      :loading="loading",
      color="#0082DE",
      @click="sendCodeToEmail"
    ) отправить код
</template>

<script src="./emailCard.js" />
<style lang="scss" src="./emailCard.scss" />
