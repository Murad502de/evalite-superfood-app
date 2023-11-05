<template lang="pug">
.signup-step1-agreement
  .signup-step1-agreement__logo
    EarthLogo

  .signup-step1-agreement__title {{ title }}
  .signup-step1-agreement__info {{ info }}

  .signup-step1-agreement__info-blocks
    InfoBlock.signup-step1-agreement__info-block(
      v-for="(infoBlock, index) in infoBlocks",
      :key="index",
      :icon="infoBlock.icon",
      :title="infoBlock.title",
      :text="infoBlock.text"
    )
</template>

<script src="./Step3Agreement.js" />
<style lang="scss" src="./Step3Agreement.scss" />
