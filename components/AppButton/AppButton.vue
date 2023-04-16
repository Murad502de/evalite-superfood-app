<template lang="pug">
v-btn.app-button(
  :color="color",
  :disabled="disabled",
  :style="{ ...defaultStyle, ...styles }",
  :outlined="outlined",
  :elevation="elevation"
  :loading="loading"
  @click="click"
)
  slot
</template>

<script src="./AppButton.js" />
<style lang="scss" src="./AppButton.scss" />
