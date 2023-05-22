<template lang="pug">
.app-select
  AppSkeleton.app-select__stub(v-if="loading", height="56")
  v-select.app-select__select(
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
