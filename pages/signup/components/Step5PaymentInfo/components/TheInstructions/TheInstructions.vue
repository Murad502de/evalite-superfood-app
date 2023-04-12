<template lang="pug">
.signup-step5-payment-info--instructions
  .signup-step5-payment-info--instructions__column-left
    InfoIconSvg.signup-step5-payment-info--instructions__icon

  .signup-step5-payment-info--instructions__column-right
    .signup-step5-payment-info--instructions__title {{ title }}
    .signup-step5-payment-info--instructions__info {{ info }}
    .signup-step5-payment-info--instructions__items
      .signup-step5-payment-info--instructions__item(
        v-for="(instruction, index) in instructions",
        :key="index"
      )
        ExternalLink.signup-step5-payment-info--instructions__item-logo
        .signup-step5-payment-info--instructions__item-title {{ instruction.title }}
</template>

<script src="./TheInstructions.js" />
<style lang="scss" src="./TheInstructions.scss" />
