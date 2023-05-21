<template lang="pug">
.app-text-field
  AppSkeleton.app-text-field__stub(v-if="loading", height="56")
  v-text-field.app-text-field__text-field(
    v-else,
    :outlined="outlined",
    :loading="loading",
    :label="label"
    :value="value",
    @input="input"
  )
</template>

<script src="./AppTextField.js" />
<style lang="scss" src="./AppTextField.scss" />
