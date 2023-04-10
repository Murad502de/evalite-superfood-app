<template lang="pug">
v-btn.app-button(
  :color="color",
  :disabled="disabled",
  :style="{ ...defaultStyle, ...styles }"
)
  slot
</template>

<script src="./AppButton.js" />
<style lang="scss" src="./AppButton.scss" />
