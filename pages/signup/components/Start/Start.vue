<template lang="pug">
.start
  .start__container
    RocketSvg.start__logo
    .start__title {{ title }}
    .start__sub-title {{ subTitle }}
    v-form.start--form(ref="form", v-model="valid", lazy-validation)
      v-text-field(
        v-model="code",
        :rules="codeRules",
        :disabled="loading",
        label="Промокод",
        required,
        outlined
      )

      .start--form__actions
        AppButton.start--form__continue(
          :disabled="!valid && !loading",
          :loading="loading",
          :styles="{ ...btnStyles }",
          color="#0082DE",
          @click="next"
        ) {{ continueBtnTitle }}
        AppButton.start--form__signin(
          :disabled="loading",
          :styles="{ ...btnStyles, ...signinBtnStyles }",
          :outlined="true"
          color="#F2F6F9",
          @click="signin"
        ) {{ signinBtnTitle }}

        .start--form__actions-info {{ actionsInfoTitle }}
</template>

<script src="./Start.js" />
<style lang="scss" src="./Start.scss" />
