<template lang="pug">
v-btn.app-button(
  :color="color",
  :disabled="disabled",
  :style="{ ...defaultStyle, ...style }"
)
  slot
</template>

<script src="./AppButton.js" />
<style lang="scss" src="./AppButton.scss" />
