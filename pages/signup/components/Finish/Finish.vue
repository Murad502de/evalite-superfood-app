<template lang="pug">
.finish
  .finish__container
    ChechSvg.finish__logo
    .finish__title {{ title }}
    .finish__sub-title {{ subTitle }}
    AppButton.finish__continue(
      :disabled="!valid && !loading",
      :loading="loading",
      :styles="{ ...btnStyles }",
      color="#0082DE",
      @click="next"
    ) {{ goToAccountBtnTitle }}
</template>

<script src="./Finish.js" />
<style lang="scss" src="./Finish.scss" />
