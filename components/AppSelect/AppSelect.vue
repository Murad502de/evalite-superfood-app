<template lang="pug">
v-select.app-select(
  :value="value",
  :rules="rules",
  :disabled="disabled",
  :items="items",
  :label="label",
  :required="required"
  :outlined="outlined"
  @input="input"
)
</template>

<script src="./AppSelect.js" />
<style lang="scss" src="./AppSelect.scss" />
