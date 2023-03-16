<template lang="pug">
v-card.forgot-pass-card(elevation="3", outlined, width="360")
  v-card-subtitle.forgot-pass-card__title Введите новый пароль
  v-form.forgot-pass-card__form(ref="form", v-model="valid", lazy-validation)
    v-text-field(
      v-model="email",
      :rules="emailRules",
      :disabled="loading",
      label="E-mail",
      required,
      outlined
    )

    v-btn.forgot-pass-card__btn(
      :disabled="!valid && !loading",
      :loading="loading",
      color="#0082DE",
      @click="forgot"
    ) отправить код
</template>

<script src="./passCard.js" />
<style lang="scss" src="./passCard.scss" />
